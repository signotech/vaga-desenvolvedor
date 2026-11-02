<?php

namespace App\Http\Controllers;

use App\Http\Requests\PedidoRequest;
use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use App\Services\PedidoService;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function __construct(private PedidoService $pedidos)
    {
    }

    public function index(Request $request)
    {
        $pedidos = Pedido::listar($request)->paginate($this->porPagina($request))->withQueryString();

        return view('pedidos.index', compact('pedidos'));
    }

    public function create()
    {
        return view('pedidos.form', $this->dadosDoForm(new Pedido(['data_pedido' => now()])));
    }

    public function store(PedidoRequest $request)
    {
        $this->pedidos->criar($request->validated());

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
        $this->pedidos->atualizar($pedido, $request->validated());

        return redirect()->route('pedidos.index')->with('ok', 'Pedido atualizado.');
    }

    public function destroy(Pedido $pedido)
    {
        $pedido->delete();

        return redirect()->route('pedidos.index')->with('ok', 'Pedido excluído.');
    }

    public function destroyMany(Request $request)
    {
        $excluidos = Pedido::whereIn('id', $this->idsSelecionados($request))->delete();

        return back()->with('ok', "$excluidos pedido(s) excluído(s).");
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
