<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteRequest;
use App\Models\Cliente;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ClienteController extends Controller {
    
    public function index(Request $request): View {

        $orderBy = $request->input('order_by', 'id');
        $direction = $request->input('direction', 'asc');

        $filterId = $request->input('id');
        $filterNome = $request->input('nome');
        $filterEmail = $request->input('email');
        $filterCpf = $request->input('cpf');

        $clientesQuery = Cliente::query();
        
        if ($filterId) {
            $clientesQuery->where('id', '=', $filterId);
        }
        if ($filterNome) {
            $clientesQuery->where('nome', 'like', '%' . $filterNome . '%');
        }
        if ($filterEmail) {
            $clientesQuery->where('email', 'like', '%' . $filterEmail . '%');
        }
        if ($filterCpf) {
            $clientesQuery->where('cpf', 'like', '%' . $filterCpf . '%');
        }

        $clientes = $clientesQuery->orderBy($orderBy, $direction)->paginate(20);

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
