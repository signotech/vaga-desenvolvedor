<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Cliente;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PedidoController extends Controller
{
    public function index(Request $request)
    {
        $query = Pedido::with('cliente', 'produtos');

        // Filtros
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('cliente', function ($q) use ($search) {
                $q->where('nome', 'like', "%{$search}%");
            })->orWhere('status', 'like', "%{$search}%");
        }

        if ($request->filled('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('data_inicio')) {
            $query->whereDate('data_pedido', '>=', $request->data_inicio);
        }

        if ($request->filled('data_fim')) {
            $query->whereDate('data_pedido', '<=', $request->data_fim);
        }

        // Ordenação
        $sortField = $request->get('sort_field', 'id');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortField, $sortOrder);

        // Itens por página
        $perPage = $request->get('per_page', 20);
        $pedidos = $query->paginate($perPage)->withQueryString();

        $clientes = Cliente::all();

        return view('pedidos.index', compact('pedidos', 'clientes'));
    }

    public function create()
    {
        $clientes = Cliente::all();
        $produtos = Produto::all();
        return view('pedidos.edit', compact('clientes', 'produtos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'produtos' => 'required|array',
            'produtos.*.id' => 'required|exists:produtos,id',
            'produtos.*.quantidade' => 'required|integer|min:1',
        ]);

        $pedido = Pedido::create([
            'cliente_id' => $request->cliente_id,
            'data_pedido' => now(),
            'status' => 'Em Aberto',
        ]);

        $sync = [];
        foreach ($request->produtos as $p) {
            // Confirma que existe o ID e a quantidade
            if (!isset($p['id']) || !isset($p['quantidade'])) continue;

            $produto = Produto::find($p['id']);
            if (!$produto) continue;

            $sync[$produto->id] = [
                'quantidade' => $p['quantidade'],
                'preco_unitario' => $produto->preco
            ];
        }

        if (!empty($sync)) {
            $pedido->produtos()->attach($sync);
        }

        return redirect()->route('pedidos.index');
    }

    public function edit(Pedido $pedido)
    {
        $clientes = Cliente::all();
        $produtos = Produto::all();
        $pedido->load('produtos');
        return view('pedidos.edit', compact('pedido', 'clientes', 'produtos'));
    }

    public function update(Request $request, Pedido $pedido)
    {
        $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'produtos' => 'required|array',
            'produtos.*.id' => 'required|exists:produtos,id',
            'produtos.*.quantidade' => 'required|integer|min:1',
            'status' => 'required|in:Em Aberto,Pago,Cancelado'
        ]);

        $pedido->update([
            'cliente_id' => $request->cliente_id,
            'status' => $request->status,
        ]);

        $sync = [];
        foreach ($request->produtos as $p) {
            if (!isset($p['id']) || !isset($p['quantidade'])) continue;

            $produto = Produto::find($p['id']);
            if (!$produto) continue;

            $sync[$produto->id] = [
                'quantidade' => $p['quantidade'],
                'preco_unitario' => $produto->preco
            ];
        }

        $pedido->produtos()->sync($sync);

        return redirect()->route('pedidos.index');
    }

    public function destroy(Pedido $pedido)
    {
        $pedido->delete();
        return redirect()->route('pedidos.index');
    }
}
