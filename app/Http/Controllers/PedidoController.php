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
            'status' => $dados['status'] //'Em Aberto'
        ]);

        foreach ($dados['produtos'] as $i => $produto_id) {
            $pedido->produtos()->attach($produto_id, ['quantidade_produto' => $dados['quantidades'][$i]]);
        }

        return redirect()->route('pedidos.index')->with('sucess', 'Pedido criado com sucesso!');
    }

    public function show($id): View {
        
        $pedido = Pedido::with(['cliente', 'produtos'])->findOrFail($id);
        return view('pedidos.show', compact('pedido'));
    }

    public function edit($id): View {
        return view('pedidos.edit');
    }

    public function update(PedidoRequest $request, $id): RedirectResponse {
        return redirect()->route('pedidos.index');
    }
    
    public function destroy($id): RedirectResponse {
        return redirect()->route('pedidos.index');
    }
}
