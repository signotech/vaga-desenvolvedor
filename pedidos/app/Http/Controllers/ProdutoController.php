<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoRequest;
use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    private const CAMPOS = ['id', 'sku', 'titulo', 'preco', 'estoque'];

    public function index(Request $request)
    {
        $produtos = Produto::listar($request, self::CAMPOS)->paginate(20)->withQueryString();

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
        if ($produto->itens()->exists()) {
            return back()->with('erro', 'Este produto está em pedidos e não pode ser excluído.');
        }

        $produto->delete();

        return redirect()->route('produtos.index')->with('ok', 'Produto excluído.');
    }
}
