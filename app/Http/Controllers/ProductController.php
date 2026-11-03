<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Mostra os produtos cadastrados.
    public function index(Request $request)
    {
        $consulta = Product::query();

        // Pegamos as informações da pesquisa.
        $campoFiltro = $request->input('filter');
        $textoPesquisa = $request->input('search');

        // Pegamos as opções de ordenação.
        $campoOrdenacao = $request->input('sort');
        $ordem = $request->input('direction');

        if ($campoOrdenacao == null || $campoOrdenacao == '') {
            $campoOrdenacao = 'id';
        }

        if ($ordem == null || $ordem == '') {
            $ordem = 'desc';
        }

        // Só aceitamos campos que realmente fazem parte do cadastro de produtos.
        if (
            $campoFiltro == 'id' ||
            $campoFiltro == 'name' ||
            $campoFiltro == 'description' ||
            $campoFiltro == 'price'
        ) {
            if ($textoPesquisa != null && $textoPesquisa != '') {
                // Para preço, procuramos o valor exato informado.
                if ($campoFiltro == 'price') {
                    $consulta->where('price', '=', $textoPesquisa);
                } else {
                    // Nos outros campos, procuramos um texto parecido.
                    $consulta->where($campoFiltro, 'like', '%' . $textoPesquisa . '%');
                }
            }
        }

        // A ordenação também fica limitada às colunas conhecidas.
        // Assim, um valor inesperado na URL não vira uma coluna da consulta.
        if (
            $campoOrdenacao != 'id' &&
            $campoOrdenacao != 'name' &&
            $campoOrdenacao != 'description' &&
            $campoOrdenacao != 'price' &&
            $campoOrdenacao != 'created_at'
        ) {
            $campoOrdenacao = 'id';
        }

        if ($ordem != 'asc' && $ordem != 'desc') {
            $ordem = 'desc';
        }

        // Organizamos os produtos e mostramos 20 por página.
        $consulta->orderBy($campoOrdenacao, $ordem);
        $produtos = $consulta->paginate(20);

        // Mantemos os filtros ao trocar de página.
        $produtos->withQueryString();

        return view('products.index', compact('produtos'));
    }

    // Abre o formulário de cadastro.
    public function create()
    {
        return view('products.create');
    }

    // Salva um produto novo.
    public function store(Request $request)
    {
        // Validamos os dados antes de criar ou atualizar o produto.
        // O preço precisa ser maior que zero e a descrição é opcional.
        $dados = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
        ]);

        Product::create($dados);

        return redirect()->route('products.index')
            ->with('success', 'Produto cadastrado com sucesso!');
    }

    // Procura um produto e abre a tela de edição.
    public function edit(string $id)
    {
        $produto = Product::findOrFail($id);

        return view('products.edit', compact('produto'));
    }

    // Atualiza os dados de um produto.
    public function update(Request $request, string $id)
    {
        $produto = Product::findOrFail($id);

        $dados = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
        ]);

        $produto->update($dados);

        return redirect()->route('products.index')
            ->with('success', 'Produto atualizado com sucesso!');
    }

    // Exclui um produto se ele não estiver em nenhum pedido.
    public function destroy(string $id)
    {
        $produto = Product::findOrFail($id);

        // Um produto usado em um pedido precisa continuar cadastrado,
        // pois o histórico da compra depende dessa informação.
        $estaEmUmPedido = $produto->orderItems()->exists();

        if ($estaEmUmPedido == true) {
            return redirect()->route('products.index')
                ->with('error', 'Não é possível excluir um produto que possui pedidos.');
        }

        $produto->delete();

        return redirect()->route('products.index')
            ->with('success', 'Produto excluído com sucesso!');
    }
}
