<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Mostra os pedidos cadastrados.
    public function index(Request $request)
    {
        // Carregamos também o cliente e os produtos de cada pedido.
        // Assim, a tela consegue mostrar essas informações sem fazer uma consulta para cada linha.
        $consulta = Order::with(['customer', 'orderItems.product']);

        $campoFiltro = $request->input('filter');
        $textoPesquisa = $request->input('search');
        $campoOrdenacao = $request->input('sort');
        $ordem = $request->input('direction');

        if ($campoOrdenacao == null || $campoOrdenacao == '') {
            $campoOrdenacao = 'id';
        }

        if ($ordem == null || $ordem == '') {
            $ordem = 'desc';
        }

        // No banco os status são gravados em inglês, mas na pesquisa
        // aceitamos os nomes que aparecem para o usuário na tela.
        if ($campoFiltro == 'status' && $textoPesquisa != null && $textoPesquisa != '') {
            $status = strtolower(trim($textoPesquisa));

            if ($status == 'em aberto') {
                $consulta->where('status', 'open');
            } elseif ($status == 'pago') {
                $consulta->where('status', 'paid');
            } elseif ($status == 'cancelado') {
                $consulta->where('status', 'cancelled');
            } else {
                $consulta->where('status', 'like', '%' . $textoPesquisa . '%');
            }
        }
        // O produto não fica diretamente na tabela orders.
        // Por isso, procuramos na tabela order_items ligada ao pedido.
        elseif ($campoFiltro == 'product_id' && $textoPesquisa != null && $textoPesquisa != '') {
            $consulta->whereHas('orderItems', function ($consultaItens) use ($textoPesquisa) {
                $consultaItens->where('product_id', $textoPesquisa);
            });
        }
        // Para os demais filtros, pesquisamos pelo número do pedido ou pelo cliente.
        elseif (
            ($campoFiltro == 'id' || $campoFiltro == 'customer_id') &&
            $textoPesquisa != null &&
            $textoPesquisa != ''
        ) {
            $consulta->where($campoFiltro, '=', $textoPesquisa);
        }

        // Conferimos se o campo escolhido para ordenar é permitido.
        if (
            $campoOrdenacao != 'id' &&
            $campoOrdenacao != 'customer_id' &&
            $campoOrdenacao != 'status' &&
            $campoOrdenacao != 'created_at' &&
            $campoOrdenacao != 'updated_at'
        ) {
            $campoOrdenacao = 'id';
        }

        if ($ordem != 'asc' && $ordem != 'desc') {
            $ordem = 'desc';
        }

        $consulta->orderBy($campoOrdenacao, $ordem);
        $pedidos = $consulta->paginate(20);
        $pedidos->withQueryString();

        return view('orders.index', compact('pedidos'));
    }

    // Abre o formulário para criar um pedido.
    public function create()
    {
        $clientes = Customer::orderBy('name')->get();
        $produtos = Product::orderBy('name')->get();

        return view('orders.create', compact('clientes', 'produtos'));
    }

    // Salva um pedido e os produtos escolhidos.
    public function store(Request $request)
    {
        // Conferimos se o cliente, o status e os produtos enviados são válidos.
        // Também exigimos pelo menos um produto e impedimos repetir o mesmo produto.
        $dados = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'status' => 'required|in:open,paid,cancelled',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id|distinct',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Salvamos o pedido e seus itens juntos. Se algo der errado,
        // o banco desfaz as alterações feitas nessa operação.
        DB::transaction(function () use ($dados) {
            $pedido = Order::create([
                'customer_id' => $dados['customer_id'],
                'status' => $dados['status'],
            ]);

            // Cada produto escolhido vira um item separado ligado a este pedido.
            foreach ($dados['products'] as $item) {
                $produto = Product::findOrFail($item['product_id']);

                $pedido->orderItems()->create([
                    'product_id' => $produto->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $produto->price,
                ]);
            }
        });

        return redirect()->route('orders.index')
            ->with('success', 'Pedido cadastrado com sucesso!');
    }

    // Abre a tela com os dados de um pedido para edição.
    public function edit(string $id)
    {
        // Buscamos o pedido junto com os produtos que já fazem parte dele.
        $pedido = Order::with('orderItems.product')->findOrFail($id);
        $clientes = Customer::orderBy('name')->get();
        $produtos = Product::orderBy('name')->get();

        return view('orders.edit', compact('pedido', 'clientes', 'produtos'));
    }

    // Atualiza o cliente, o status e os produtos de um pedido.
    public function update(Request $request, string $id)
    {
        $dados = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'status' => 'required|in:open,paid,cancelled',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id|distinct',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($dados, $id) {
            $pedido = Order::with('orderItems')->findOrFail($id);

            // Guardamos o preço de cada produto que já estava no pedido.
            // Dessa forma, uma mudança no preço atual do catálogo não altera uma compra antiga.
            $precosAntigos = [];

            foreach ($pedido->orderItems as $itemAntigo) {
                $precosAntigos[$itemAntigo->product_id] = $itemAntigo->unit_price;
            }

            $pedido->update([
                'customer_id' => $dados['customer_id'],
                'status' => $dados['status'],
            ]);

            // Recriamos os itens com a seleção enviada na edição.
            // Os preços antigos já foram guardados acima para manter o histórico.
            $pedido->orderItems()->delete();

            foreach ($dados['products'] as $item) {
                $produto = Product::findOrFail($item['product_id']);

                // Se o produto já estava no pedido, usamos o preço antigo.
                // Se for um produto novo, usamos o preço que está cadastrado agora.
                if (isset($precosAntigos[$produto->id])) {
                    $precoDoProduto = $precosAntigos[$produto->id];
                } else {
                    $precoDoProduto = $produto->price;
                }

                $pedido->orderItems()->create([
                    'product_id' => $produto->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $precoDoProduto,
                ]);
            }
        });

        return redirect()->route('orders.index')
            ->with('success', 'Pedido atualizado com sucesso!');
    }

    // Exclui um pedido. Os itens dele também são excluídos pelo banco.
    public function destroy(string $id)
    {
        // A chave estrangeira da tabela order_items está configurada para
        // excluir os itens junto com o pedido.
        $pedido = Order::findOrFail($id);
        $pedido->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Pedido excluído com sucesso!');
    }
}
