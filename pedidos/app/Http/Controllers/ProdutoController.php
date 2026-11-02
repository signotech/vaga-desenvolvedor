<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoRequest;
use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{

    public function index(Request $request)
    {
        $produtos = $this->paginar(Produto::listar($request), $request);

        return view('produtos.index', compact('produtos'));
    }

    public function create()
    {
        return view('produtos.form', ['produto' => new Produto()]);
    }

    public function store(ProdutoRequest $request)
    {
        Produto::create($request->validated());

        return redirect()->route('produtos.index')->with('ok', 'Produto cadastrado.');
    }

    public function edit(Produto $produto)
    {
        return view('produtos.form', compact('produto'));
    }

    public function update(ProdutoRequest $request, Produto $produto)
    {
        $produto->update($request->validated());

        return redirect()->route('produtos.index')->with('ok', 'Produto atualizado.');
    }

    public function destroy(Produto $produto)
    {
        if ($produto->temVinculos()) {
            return back()->with('erro', 'Este produto está em pedidos e não pode ser excluído.');
        }

        $produto->delete();

        return redirect()->route('produtos.index')->with('ok', 'Produto excluído.');
    }

    public function destroyMany(Request $request)
    {
        $ids = $this->idsSelecionados($request);

        [$excluidos, $ignorados] = Produto::excluirSemVinculos($ids);

        $retorno = back()->with('ok', "$excluidos produto(s) excluído(s).");

        if ($ignorados > 0) {
            $retorno->with('erro', "$ignorados produto(s) estão em pedidos e não foram excluídos.");
        }

        return $retorno;
    }
}
