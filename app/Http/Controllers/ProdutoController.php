<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;


class ProdutoController extends Controller
{
    public function index(Request $request)
    {
        $query = Produto::query();

        if ($request->filled('search')) {
            $query->where('titulo', 'like', "%{$request->search}%");
        }

        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->get('per_page', 20);
        $produtos = $query->paginate($perPage)->withQueryString();

        return view('produtos.index', compact('produtos'));
    }

    public function json(Request $request)
    {
        $query = Produto::query();

        if ($request->filled('search')) {
            $query->where('titulo', 'like', "%{$request->search}%");
        }

        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = (int) $request->get('per_page', 10);
        $produtos = $query->paginate($perPage)->withQueryString();

        return response()->json($produtos);
    }

    public function create()
    {
        return view('produtos.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'estoque' => 'required|integer|min:0',
            'descricao' => 'nullable|string',
        ]);

        Produto::create($request->only(['titulo', 'preco', 'estoque', 'descricao']));

        return redirect()->route('produtos.index')->with('success', 'Produto criado com sucesso!');
    }

    public function edit(Produto $produto)
    {
        return view('produtos.edit', compact('produto'));
    }

    public function update(Request $request, Produto $produto)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'estoque' => 'required|integer|min:0',
            'descricao' => 'nullable|string',
        ]);

        $produto->update($request->only(['titulo', 'preco', 'estoque', 'descricao']));

        return redirect()->route('produtos.index')->with('success', 'Produto atualizado com sucesso!');
    }

    public function destroy(Request $request, Produto $produto)
    {
        $produto->delete();

        if ($request->ajax()) {
            return response()->json(['message' => 'Produto excluído com sucesso!'], 200);
        }

        return redirect()->route('produtos.index')->with('success', 'Produto excluído com sucesso!');
    }
}
