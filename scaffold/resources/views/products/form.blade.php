@extends('layouts.app')
@section('title', $product->exists ? 'Editar produto' : 'Novo produto')
@section('content')
<h4>{{ $product->exists ? 'Editar produto' : 'Novo produto' }}</h4>
<div class="card"><div class="card-content"><form method="POST" action="{{ $product->exists ? route('produtos.update',$product) : route('produtos.store') }}">@csrf @if($product->exists)@method('PUT')@endif
<div class="row"><div class="input-field col s12 m4"><input name="sku" value="{{ old('sku',$product->sku) }}" required><label class="active">SKU *</label></div><div class="input-field col s12 m8"><input name="title" value="{{ old('title',$product->title) }}" required><label class="active">Título *</label></div><div class="input-field col s12"><textarea name="description" class="materialize-textarea">{{ old('description',$product->description) }}</textarea><label class="active">Descrição</label></div><div class="input-field col s12 m6"><input name="price" type="number" step="0.01" min="0" value="{{ old('price',$product->price) }}" required><label class="active">Preço *</label></div><div class="input-field col s12 m6"><input name="stock" type="number" min="0" value="{{ old('stock',$product->stock ?? 0) }}" required><label class="active">Estoque *</label></div></div>
<button class="btn">Salvar</button> <a class="btn-flat" href="{{ route('produtos.index') }}">Cancelar</a></form></div></div>
@endsection
