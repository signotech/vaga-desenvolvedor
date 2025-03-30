<?php

namespace App\Http\Controllers;

use App\Http\Requests\PedidoRequest;
use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PedidoController extends Controller {
    
    public function index(Request $request): View {

        $clientes = Cliente::all();
        $produtos = Produto::all();

        $ordemPor = $request->input('ordem_por', 'id');
        $ordem = $request->input('ordem', 'asc');

        $pedidosQuery = Pedido::with(['cliente', 'produtos']);

        $filtroId = $request->input('id');
        $filtroCliente = $request->input('cliente_id');
        $filtroStatus = $request->input('status');
        $filtroData = $request->input('data');
        $filtroProduto = $request->input('produto_id');
        // $filtroValor = $request->input('valor');

        if ($filtroId) {
            $pedidosQuery->where('id', '=', $filtroId);
        }
        if ($filtroCliente) {
            $pedidosQuery->where('cliente_id', '=', $filtroCliente);
        }
        if ($filtroStatus) {
            $pedidosQuery->where('status', '=', $filtroStatus);
        }
        if ($filtroData) {
            $pedidosQuery->whereDate('created_at', '=', $filtroData);
        }
        if ($filtroProduto) {
            $pedidosQuery->whereHas('produtos', function ($query) use ($filtroProduto) {
                $query->where('produtos.id', $filtroProduto);
            });
        }

        if ($ordemPor === 'cliente') {
            $pedidosQuery->join('clientes', 'pedidos.cliente_id', '=', 'clientes.id')
                         ->orderBy('clientes.nome', $ordem)
                         ->select('pedidos.*');
        } else {
            $pedidosQuery->orderBy($ordemPor, $ordem);
        }

        $pedidos = $pedidosQuery->orderBy($ordemPor, $ordem)->paginate(20);

        return view('pedidos.index', compact('pedidos', 'clientes', 'produtos'));
    }

    public function create(): View {

        $clientes = Cliente::all();
        $produtos = Produto::all();

        return view('pedidos.create', compact('clientes', 'produtos'));
    }

    public function store(PedidoRequest $request): RedirectResponse {

        $dados = $request->validated();

        $pedido = Pedido::create([
            'cliente_id' => $dados['cliente_id'],
            'status' => $dados['status']
        ]);

        foreach ($dados['produtos'] as $i => $produto_id) {
            $pedido->produtos()->attach($produto_id, ['quantidade_produto' => $dados['quantidades'][$i]]);
        }

        return redirect()->route('pedidos.index')->with('sucesso', 'Pedido criado com sucesso!');
    }

    public function show($id): View {
        
        $pedido = Pedido::with(['cliente', 'produtos'])->findOrFail($id);
        return view('pedidos.show', compact('pedido'));
    }

    public function edit($id): View {

        $pedido = Pedido::with('produtos')->findOrFail($id);
        $clientes = Cliente::all();
        $produtos = Produto::all();

        return view('pedidos.edit', compact('pedido', 'clientes', 'produtos'));
    }

    public function update(PedidoRequest $request, $id) {

        $dados = $request->validated();
        $pedido = Pedido::findOrFail($id);

        $pedido->update([
            'cliente_id' => $dados['cliente_id'],
            'status' => $dados['status'],
        ]);

        $pedido->produtos()->detach();

        foreach ($dados['produtos'] as $i => $produto_id) {
            $pedido->produtos()->attach($produto_id, ['quantidade_produto' => $dados['quantidades'][$i]]);
        }

        return redirect()->route('pedidos.index')->with('sucesso', 'Pedido atualizado com sucesso!');
    }

    
    public function destroy($id): RedirectResponse {
        
        $pedido = Pedido::findOrFail($id);
        $pedido->delete();

        return redirect()->route('pedidos.index')->with('sucesso', 'Pedido excluído com sucesso!');
    }
}
