<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoRequest;
use App\Models\Produto;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProdutoController extends Controller {
    
    public function index(Request $request): View {

        $ordemPor = $request->input('ordem_por', 'id');
        $ordem = $request->input('ordem', 'asc');
        $itensPorPagina = $request->input('itens_por_pagina', 20);

        $filtroId = $request->input('id');
        $filtroTitulo = $request->input('titulo');
        $filtroPreco = $request->input('preco');
        $filtroEstoque = $request->input('estoque');
        $filtroCodigoSku = $request->input('codigo_sku');

        $produtosQuery = Produto::query();

        if ($filtroId) {
            $produtosQuery->where('id', '=', $filtroId);
        }
        if ($filtroTitulo) {
            $produtosQuery->where('titulo', 'like', '%' . $filtroTitulo . '%');
        }
        if ($filtroPreco) {
            $produtosQuery->where('preco', '=', $filtroPreco);
        }
        if ($filtroEstoque) {
            $produtosQuery->where('estoque', '=', $filtroEstoque);
        }
        if ($filtroCodigoSku) {
            $produtosQuery->where('codigo_sku', 'like', '%' . $filtroCodigoSku . '%');
        }

        $produtos = $produtosQuery->orderBy($ordemPor, $ordem)->paginate($itensPorPagina);

        return view('produtos.index', compact('produtos'));
    }

    public function create(): View {
        return view('produtos.create');
    }

    public function store(ProdutoRequest $request): RedirectResponse {

        Produto::create($request->validated());

        return redirect()->route('produtos.index')->with('sucesso', 'Produto criado com sucesso!');
    }

    public function show($id): View {

        $produto = Produto::findOrFail($id);

        return view('produtos.show', compact('produto'));
    }

    public function edit($id): View {

        $produto = Produto::findOrFail($id);

        return view('produtos.edit', compact('produto'));
    }

    public function update(ProdutoRequest $request, $id): RedirectResponse {

        $produto = Produto::findOrFail($id);
        $produto->update($request->validated());

        return redirect()->route('produtos.index')->with('sucesso', 'Produto editado com sucesso!');
    }
    
    public function destroy($id): RedirectResponse {

        $produto = Produto::findOrFail($id);
        $produto->delete();

        return redirect()->route('produtos.index')->with('sucesso', 'Produto excluído com sucesso!');
    }
}
