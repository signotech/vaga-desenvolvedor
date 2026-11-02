<?php

namespace App\Http\Controllers;

use App\Http\Requests\PedidoRequest;
use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    private const ORDENAVEIS = ['id', 'data_pedido', 'status', 'cliente'];

    public function index(Request $request)
    {
        $query = Pedido::query()
            ->join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
            ->select('pedidos.*', 'clientes.nome as cliente')
            ->with('itens');

        if ($request->filled('id')) {
            $query->where('pedidos.id', $request->input('id'));
        }
        if ($request->filled('cliente')) {
            $query->where('clientes.nome', 'like', '%' . $request->input('cliente') . '%');
        }
        if ($request->filled('data_pedido')) {
            $query->whereDate('pedidos.data_pedido', $request->input('data_pedido'));
        }
        if ($request->filled('status')) {
            $query->where('pedidos.status', $request->input('status'));
        }

        $ordem = in_array($request->input('ordem'), self::ORDENAVEIS) ? $request->input('ordem') : 'id';
        $coluna = $ordem === 'cliente' ? 'clientes.nome' : "pedidos.$ordem";
        $direcao = $request->input('direcao') === 'desc' ? 'desc' : 'asc';

        $pedidos = $query->orderBy($coluna, $direcao)->paginate(20)->withQueryString();

        return view('pedidos.index', compact('pedidos'));
    }

    public function create()
    {
        return view('pedidos.form', $this->dadosDoForm(new Pedido(['data_pedido' => now()])));
    }

    public function store(PedidoRequest $request)
    {
        DB::transaction(function () use ($request) {
            $pedido = Pedido::create($request->safe()->only(['cliente_id', 'data_pedido', 'status']));
            $this->salvarItens($pedido, $request->input('itens'));
        });

        return redirect()->route('pedidos.index')->with('ok', 'Pedido cadastrado.');
    }

    public function show(Pedido $pedido)
    {
        $pedido->load('cliente', 'itens.produto');

        return view('pedidos.show', compact('pedido'));
    }

    public function edit(Pedido $pedido)
    {
        return view('pedidos.form', $this->dadosDoForm($pedido->load('itens')));
    }

    public function update(PedidoRequest $request, Pedido $pedido)
    {
        DB::transaction(function () use ($request, $pedido) {
            $pedido->update($request->safe()->only(['cliente_id', 'data_pedido', 'status']));
            $pedido->itens()->delete();
            $this->salvarItens($pedido, $request->input('itens'));
        });

        return redirect()->route('pedidos.index')->with('ok', 'Pedido atualizado.');
    }

    public function destroy(Pedido $pedido)
    {
        $pedido->delete();

        return redirect()->route('pedidos.index')->with('ok', 'Pedido excluído.');
    }

    private function salvarItens(Pedido $pedido, array $itens): void
    {
        $produtos = Produto::whereIn('id', collect($itens)->pluck('produto_id'))->get()->keyBy('id');

        foreach ($itens as $item) {
            $pedido->itens()->create([
                'produto_id' => $item['produto_id'],
                'quantidade' => $item['quantidade'],
                'preco_unitario' => $produtos[$item['produto_id']]->preco,
            ]);
        }
    }

    private function dadosDoForm(Pedido $pedido): array
    {
        return [
            'pedido' => $pedido,
            'clientes' => Cliente::orderBy('nome')->get(['id', 'nome']),
            'produtos' => Produto::orderBy('titulo')->get(['id', 'titulo', 'sku', 'preco']),
        ];
    }
}
