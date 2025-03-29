<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteRequest;
use App\Models\Cliente;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ClienteController extends Controller {
    
    public function index(): View {

        $clientes = Cliente::all();

        return view('clientes.index', compact('clientes'));
    }

    public function create(): View {
        return view('clientes.create');
    }

    public function store(ClienteRequest $request): RedirectResponse {

        Cliente::create($request->validated());

        return redirect()->route('clientes.index')->with('sucesso', 'Cliente criado com sucesso!');
    }

    public function show($id): View {

        $cliente = Cliente::findOrFail($id);

        return view('clientes.show', compact('cliente'));
    }

    public function edit($id): View {

        $cliente = Cliente::findOrFail($id);

        return view('clientes.edit', compact('cliente'));
    }

    public function update(ClienteRequest $request, $id): RedirectResponse {

        $cliente = Cliente::findOrFail($id);
        $cliente->update($request->validated());

        return redirect()->route('clientes.index')->with('sucesso', 'Cliente editado com sucesso!');
    }
    
    public function destroy($id): RedirectResponse {

        $cliente = Cliente::findOrFail($id);

        $cliente->delete();

        return redirect()->route('clientes.index')->with('sucesso', 'Cliente excluído com sucesso!');
    }
}
