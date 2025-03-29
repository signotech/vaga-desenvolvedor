<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PedidoController extends Controller {
    
    public function index(): View {

        $pedidos = Pedido::all();

        return view('pedidos.index', compact('pedidos'));
    }

    public function create(): View {
        return view('pedidos.create');
    }

    public function store(Request $request): RedirectResponse {
        return redirect()->route('pedidos.index');
    }

    public function show($id): View {
        return view('pedidos.show');
    }

    public function edit($id): View {
        return view('pedidos.edit');
    }

    public function update(Request $request, $id): RedirectResponse {
        return redirect()->route('pedidos.index');
    }
    
    public function destroy($id): RedirectResponse {
        return redirect()->route('pedidos.index');
    }
}
