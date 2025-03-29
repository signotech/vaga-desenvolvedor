<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoRequest;
use App\Models\Produto;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProdutoController extends Controller {
    
    public function index(): View {

        $produtos = Produto::all();

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
