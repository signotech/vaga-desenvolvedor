@extends('layouts.main')

@section('content')
    <h1>Detalhes do Pedido</h1>

    <h3>Cliente: {{ $pedido->cliente->nome }}</h3>
    <h4>Status: {{ $pedido->status }}</h4>

    <h3>Produtos:</h3>
    <ul>
        @foreach($pedido->produtos as $produto)
            <li>{{ $produto->titulo }} - Quantidade: {{ $produto->pivot->quantidade_produto }} - R$ {{ number_format($produto->preco, 2, ',', '.') }}</li>
        @endforeach
    </ul>

@endsection
