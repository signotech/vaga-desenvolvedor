@extends('layouts.app')
@section('title','Detalhe do produto')
@section('content')
<h4>{{ $product->title }}</h4><div class="card"><div class="card-content"><p><b>SKU:</b> {{ $product->sku }}</p><p><b>Preço atual:</b> R$ {{ number_format($product->price,2,',','.') }}</p><p><b>Estoque:</b> {{ $product->stock }}</p><p>{{ $product->description }}</p><a class="btn" href="{{ route('produtos.edit',$product) }}">Editar</a></div></div>
@endsection
