@extends('layouts.app')
@section('title','Produtos')
@section('content')
<div class="row"><div class="col s8"><h4>Produtos</h4><p class="muted">Catálogo, preços e estoque.</p></div><div class="col s4 right-align" style="padding-top:18px"><a class="btn" href="{{ route('produtos.create') }}"><i class="material-icons left">add</i>Novo</a></div></div>
<div class="card"><div class="card-content">
<form method="GET" class="row" style="margin-bottom:0">
@foreach(['sku'=>'SKU','title'=>'Título','price'=>'Preço','stock'=>'Estoque'] as $field=>$label)<div class="input-field col s12 m3"><input name="{{ $field }}" value="{{ request($field) }}" placeholder="{{ $label }}"><label class="active">{{ $label }}</label></div>@endforeach
<div class="col s12"><button class="btn-small">Filtrar</button> <a href="{{ route('produtos.index') }}">Limpar</a></div></form>
<form method="POST" action="{{ route('produtos.bulk-destroy') }}">@csrf @method('DELETE')<div class="right-align"><button class="btn-small red" onclick="return confirmDelete('Excluir os produtos selecionados?')">Excluir selecionados</button></div>
<table class="striped responsive-table"><thead><tr><th><label><input type="checkbox" onclick="toggleAll(this)"><span></span></label></th>@foreach(['id'=>'ID','sku'=>'SKU','title'=>'Produto','price'=>'Preço','stock'=>'Estoque'] as $field=>$label)<th><a class="black-text" href="{{ request()->fullUrlWithQuery(['sort'=>$field,'direction'=>request('direction')==='asc'?'desc':'asc']) }}">{{ $label }} ↕</a></th>@endforeach<th>Ações</th></tr></thead>
<tbody>@forelse($products as $product)<tr><td><label><input class="row-check" type="checkbox" name="ids[]" value="{{ $product->id }}"><span></span></label></td><td>{{ $product->id }}</td><td>{{ $product->sku }}</td><td><a href="{{ route('produtos.show',$product) }}">{{ $product->title }}</a></td><td>R$ {{ number_format($product->price,2,',','.') }}</td><td>{{ $product->stock }}</td><td><a href="{{ route('produtos.edit',$product) }}">Editar</a> · <form style="display:inline" method="POST" action="{{ route('produtos.destroy',$product) }}" onsubmit="return confirmDelete()">@csrf @method('DELETE')<button class="btn-flat red-text">Excluir</button></form></td></tr>@empty<tr><td colspan="7">Nenhum produto encontrado.</td></tr>@endforelse</tbody></table></form>
<div class="row" style="margin-top:18px"><div class="col s6">{{ $products->links() }}</div><div class="col s6">@include('partials.pagination-size')</div></div>
</div></div>
@endsection
