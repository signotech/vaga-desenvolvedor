<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteRequest;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    private const CAMPOS = ['id', 'nome', 'cpf', 'email'];

    public function index(Request $request)
    {
        $clientes = Cliente::listar($request, self::CAMPOS)->paginate($this->porPagina($request))->withQueryString();

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
        if ($cliente->pedidos()->exists()) {
            return back()->with('erro', 'Este cliente possui pedidos e não pode ser excluído.');
        }

        $cliente->delete();

        return redirect()->route('clientes.index')->with('ok', 'Cliente excluído.');
    }

    public function destroyMany(Request $request)
    {
        $ids = $this->idsSelecionados($request);

        $comPedidos = Cliente::whereIn('id', $ids)->whereHas('pedidos')->pluck('id');
        $excluidos = Cliente::whereIn('id', $ids)->whereNotIn('id', $comPedidos)->delete();

        $retorno = back()->with('ok', "$excluidos cliente(s) excluído(s).");

        if ($comPedidos->isNotEmpty()) {
            $retorno->with('erro', $comPedidos->count() . ' cliente(s) possuem pedidos e não foram excluídos.');
        }

        return $retorno;
    }
}
