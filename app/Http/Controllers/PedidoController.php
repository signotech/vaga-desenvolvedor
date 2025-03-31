<?php

namespace App\Http\Controllers;

use App\Http\Requests\PedidoRequest;
use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PedidoController extends Controller {
    
    public function index(Request $request): View {

        $clientes = Cliente::orderBy('nome', 'asc')->get();
        $produtos = Produto::orderBy('titulo', 'asc')->get();

        $ordemPor = $request->input('ordem_por', 'id');
        $ordem = $request->input('ordem', 'asc');
        $itensPorPagina = $request->input('itens_por_pagina', 20);

        $pedidosQuery = Pedido::with(['cliente', 'produtos']);

        $filtroId = $request->input('id');
        $filtroCliente = $request->input('cliente_id');
        $filtroStatus = $request->input('status');
        $filtroDataMinima = $request->input('data_minima');
        $filtroDataMaxima = $request->input('data_maxima');
        $filtroProduto = $request->input('produto_id');
        $filtroValor = $request->input('valor');

        if ($filtroId) {
            $pedidosQuery->where('id', '=', $filtroId);
        }
        if ($filtroCliente) {
            $pedidosQuery->where('cliente_id', '=', $filtroCliente);
        }
        if ($filtroValor) {
            $pedidosQuery->where('valor_total', '=', $filtroValor);
        }
        if ($filtroStatus) {
            $pedidosQuery->where('status', '=', $filtroStatus);
        }
        if ($filtroDataMinima) {
            $pedidosQuery->whereDate('created_at', '>=', $filtroDataMinima);
        }
        if ($filtroDataMaxima) {
            $pedidosQuery->whereDate('created_at', '<=', $filtroDataMaxima);
        }
        if ($filtroProduto) {
            $pedidosQuery->whereHas('produtos', function ($query) use ($filtroProduto) {
                $query->where('produtos.id', $filtroProduto);
            });
        }

        if ($ordemPor === 'cliente') {
            $pedidosQuery->join('clientes', 'pedidos.cliente_id', '=', 'clientes.id')
                         ->orderBy('clientes.nome', $ordem)
                         ->select('pedidos.*');
        } else {
            $pedidosQuery->orderBy($ordemPor, $ordem);
        }

        $pedidos = $pedidosQuery->orderBy($ordemPor, $ordem)->paginate($itensPorPagina);

        return view('pedidos.index', compact('pedidos', 'clientes', 'produtos'));
    }

    public function create(): View {

        $clientes = Cliente::orderBy('nome', 'asc')->get();
        $produtos = Produto::orderBy('titulo', 'asc')->get();

        return view('pedidos.create', compact('clientes', 'produtos'));
    }

    public function store(PedidoRequest $request): RedirectResponse {

        $dados = $request->validated();

        // verifica se há estoque suficiente
        $erroEstoque = $this->verificarEstoqueSuficiente($dados['produtos'], $dados['quantidades']);
        if ($erroEstoque) {
            return redirect()->back()->withErrors(['produtos' => $erroEstoque['erro']])->withInput();
        }

        // cria o pedido
        $pedido = Pedido::create([
            'cliente_id' => $dados['cliente_id'],
            'status' => $dados['status'],
            'valor_total' => 0,
        ]);

        $valorTotal = 0;
        foreach ($dados['produtos'] as $i => $produto_id) {

            // calcula o valor total do produto
            $produto = Produto::find($produto_id);
            $quantidade = $dados['quantidades'][$i];
            $valorProduto = $produto->preco * $quantidade;

            // retira a quantidade do estoque
            $produto->estoque -= $quantidade;
            $produto->save();

            // adiciona o valor do produto ao valor total
            $valorTotal+= $valorProduto;

            // adiciona o produto ao pedido
            $pedido->produtos()->attach(
                $produto_id, [
                    'quantidade_produto' => $quantidade,
                    'valor_produto' => $valorProduto,
            ]);
        }

        // atualiza o valor total do pedido
        $pedido->valor_total = $valorTotal;
        $pedido->save();

        return redirect()->route('pedidos.index')->with('sucesso', 'Pedido criado com sucesso!');
    }

    public function show($id): View {
        
        $pedido = Pedido::with(['cliente', 'produtos' => function($query) {
            $query->withPivot('quantidade_produto', 'valor_produto');
        }])->findOrFail($id);
    
        return view('pedidos.show', compact('pedido'));
    }

    public function edit($id): View {

        $pedido = Pedido::with('produtos')->findOrFail($id);
        $clientes = Cliente::orderBy('nome', 'asc')->get();
        $produtos = Produto::orderBy('titulo', 'asc')->get();

        return view('pedidos.edit', compact('pedido', 'clientes', 'produtos'));
    }

    public function update(PedidoRequest $request, $id) {

        $dados = $request->validated();
        $pedido = Pedido::findOrFail($id);

        // devolve o estoque do produto
        foreach ($pedido->produtos as $produto) {

            $quantidadeAnterior = $produto->pivot->quantidade_produto;

            $produto->estoque += $quantidadeAnterior;
            $produto->save();
        }

        // verifica se há estoque suficiente
        $erroEstoque = $this->verificarEstoqueSuficiente($dados['produtos'], $dados['quantidades']);
        if ($erroEstoque) {
            return redirect()->back()->withErrors(['produtos' => $erroEstoque['erro']])->withInput();
        }

        $pedido->update([
            'cliente_id' => $dados['cliente_id'],
            'status' => $dados['status'],
        ]);

        // desanexa os produtos do pedido
        $pedido->produtos()->detach();

        $valorTotal =0;
        foreach ($dados['produtos'] as $i => $produto_id) {
            $produto = Produto::find($produto_id);
            $quantidade = $dados['quantidades'][$i];
            $valorProduto = $produto->preco * $quantidade;
    
            // retira do estoque a quantidade do produto
            $produto->estoque -= $quantidade;
            $produto->save();
    
            // adiciona o valor do produto ao valor total
            $valorTotal += $valorProduto;
    
            // adiciona o produto ao pedido
            $pedido->produtos()->attach($produto_id, [
                'quantidade_produto' => $quantidade,
                'valor_produto' => $valorProduto,
            ]);
        }

        // atualiza o valor total do pedido
        $pedido->valor_total = $valorTotal;
        $pedido->save();

        return redirect()->route('pedidos.index')->with('sucesso', 'Pedido atualizado com sucesso!');
    }

    
    public function destroy($id): RedirectResponse {
        
        $pedido = Pedido::findOrFail($id);

        // devolve o estoque do produto
        foreach ($pedido->produtos as $produto) {

            $quantidadeAnterior = $produto->pivot->quantidade_produto;

            $produto->estoque += $quantidadeAnterior;
            $produto->save();
        }

        $pedido->delete();

        return redirect()->route('pedidos.index')->with('sucesso', 'Pedido excluído com sucesso!');
    }

    private function verificarEstoqueSuficiente(array $produtos, array $quantidades) {

        foreach ($produtos as $i => $produto_id) {
            
            $produto = Produto::find($produto_id);
            $quantidade = $quantidades[$i];

            if ($produto->estoque < $quantidade) {
                return ['erro' => 'Produto ' . $produto->título . ' não tem estoque suficiente.'];
            }

            return null;
        }
    }
}
