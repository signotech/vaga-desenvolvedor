@extends('layouts.app')

@section('content')
<div style="text-align:center; margin-top:50px;">
    <h1>Bem-vindo ao Sistema de Pedidos</h1>
    <p>Escolha uma das opções abaixo:</p>
    <div style="margin-top:20px;">
        <a href="{{ route('clientes.index') }}" style="margin:10px;">Clientes</a>
        <a href="{{ route('produtos.index') }}" style="margin:10px;">Produtos</a>
        <a href="{{ route('pedidos.index') }}" style="margin:10px;">Pedidos</a>
    </div>
</div>
@endsection