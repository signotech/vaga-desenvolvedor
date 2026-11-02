<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteRequest;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{

    public function index(Request $request)
    {
        $clientes = $this->paginar(Cliente::listar($request), $request);

        return view('clientes.index', compact('clientes'));
    }

    public function create()
    {
        return view('clientes.form', ['cliente' => new Cliente()]);
    }

    public function store(ClienteRequest $request)
    {
        Cliente::create($request->validated());

        return redirect()->route('clientes.index')->with('ok', 'Cliente cadastrado.');
    }

    public function edit(Cliente $cliente)
    {
        return view('clientes.form', compact('cliente'));
    }

    public function update(ClienteRequest $request, Cliente $cliente)
    {
        $cliente->update($request->validated());

        return redirect()->route('clientes.index')->with('ok', 'Cliente atualizado.');
    }

    public function destroy(Cliente $cliente)
    {
        if ($cliente->temVinculos()) {
            return back()->with('erro', 'Este cliente possui pedidos e não pode ser excluído.');
        }

        $cliente->delete();

        return redirect()->route('clientes.index')->with('ok', 'Cliente excluído.');
    }

    public function destroyMany(Request $request)
    {
        $ids = $this->idsSelecionados($request);

        [$excluidos, $ignorados] = Cliente::excluirSemVinculos($ids);

        $retorno = back()->with('ok', "$excluidos cliente(s) excluído(s).");

        if ($ignorados > 0) {
            $retorno->with('erro', "$ignorados cliente(s) possuem pedidos e não foram excluídos.");
        }

        return $retorno;
    }
}
