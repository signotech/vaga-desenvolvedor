<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ClienteController extends Controller {
    
    public function index(): View {
        return view('clientes.index');
    }

    public function create(): View {
        return view('clientes.create');
    }

    public function store(Request $request): RedirectResponse {
        return redirect()->route('clientes.index');
    }

    public function show($id): View {
        return view('clientes.show');
    }

    public function edit($id): View {
        return view('clientes.edit');
    }

    public function update(Request $request, $id): RedirectResponse {
        return redirect()->route('clientes.index');
    }
    
    public function destroy($id): RedirectResponse {
        return redirect()->route('clientes.index');
    }
}
