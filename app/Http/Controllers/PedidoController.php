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
    
    public function index(): View {

        $pedidos = Pedido::with('cliente')->get();

        return view('pedidos.index', compact('pedidos'));
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
