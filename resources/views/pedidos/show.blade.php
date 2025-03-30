@extends('layouts.main')

@section('content')
    <h1>Detalhes do Pedido</h1>

    <h3>Cliente: <a href="{{ route('clientes.show', $pedido->cliente->id) }}">{{ $pedido->cliente->nome }}</a></h3>
    <h4>Status: {{ $pedido->status }}</h4>

    <h3>Produtos:</h3>
    <ul>
        @foreach($pedido->produtos as $produto)
            <li><a href="{{ route('produtos.show', $produto->id) }}">{{ $produto->titulo }}</a> - Quantidade: {{ $produto->pivot->quantidade_produto }} - R$ {{ number_format($produto->pivot->valor_produto, 2, ',', '.') }}</li>
        @endforeach
    </ul>

    <h3>Valor Total: {{ $pedido->valor_total }}</h3>

    <h3>Criado em: {{ $pedido->created_at }}</h3>
    <h3>Atualizado em: {{ $pedido->updated_at }}</h3>

@endsection
