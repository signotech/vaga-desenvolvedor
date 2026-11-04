@extends('layouts.app')
@section('title', $order->exists ? 'Editar pedido' : 'Novo pedido')
@section('content')
<h4>{{ $order->exists ? 'Editar pedido' : 'Novo pedido' }}</h4>
<div class="card"><div class="card-content"><form method="POST" action="{{ $order->exists ? route('pedidos.update',$order) : route('pedidos.store') }}">@csrf @if($order->exists)@method('PUT')@endif
<div class="row"><div class="input-field col s12 m6"><select name="customer_id" required><option value="" disabled selected>Selecione</option>@foreach($customers as $customer)<option value="{{ $customer->id }}" @selected(old('customer_id',$order->customer_id)==$customer->id)>{{ $customer->name }}</option>@endforeach</select><label>Cliente *</label></div>
<div class="input-field col s12 m6"><select name="order_status_id" required>@foreach($statuses as $status)<option value="{{ $status->id }}" @selected(old('order_status_id',$order->order_status_id)==$status->id)>{{ $status->name }}</option>@endforeach</select><label>Status *</label></div>
<div class="input-field col s12 m6"><input name="ordered_at" type="datetime-local" value="{{ old('ordered_at',$order->ordered_at?->format('Y-m-d\TH:i') ?? now()->format('Y-m-d\TH:i')) }}" required><label class="active">Data do pedido *</label></div>
<div class="input-field col s12 m6"><input name="discount" type="number" step="0.01" min="0" value="{{ old('discount',$order->discount ?? 0) }}"><label class="active">Desconto em R$</label></div></div>
<h6>Itens do pedido</h6><p class="muted">Selecione produtos e quantidades. O preço atual será registrado como preço histórico do item.</p>
<div id="items">@php $oldItems=old('items', $order->exists ? $order->items->map(fn($i)=>['product_id'=>$i->product_id,'quantity'=>$i->quantity])->toArray() : [['product_id'=>'','quantity'=>1]]) @endphp
@foreach($oldItems as $index=>$item)<div class="row item-row"><div class="input-field col s8"><select name="items[{{ $index }}][product_id]" required><option value="" disabled selected>Produto</option>@foreach($products as $product)<option value="{{ $product->id }}" @selected(($item['product_id']??'')==$product->id)>{{ $product->title }} — R$ {{ number_format($product->price,2,',','.') }} (estoque {{ $product->stock }})</option>@endforeach</select><label>Produto</label></div><div class="input-field col s3"><input type="number" min="1" name="items[{{ $index }}][quantity]" value="{{ $item['quantity']??1 }}" required><label class="active">Qtd.</label></div><div class="col s1"><a href="#!" onclick="this.closest('.item-row').remove()">×</a></div></div>@endforeach
</div><button type="button" class="btn-flat" onclick="addItem()">+ Adicionar produto</button><br><br>
<button class="btn">Salvar pedido</button> <a class="btn-flat" href="{{ route('pedidos.index') }}">Cancelar</a></form></div></div>
<template id="item-template"><div class="row item-row"><div class="input-field col s8"><select name="items[INDEX][product_id]" required><option value="" disabled selected>Produto</option>@foreach($products as $product)<option value="{{ $product->id }}">{{ $product->title }} — R$ {{ number_format($product->price,2,',','.') }} (estoque {{ $product->stock }})</option>@endforeach</select><label>Produto</label></div><div class="input-field col s3"><input type="number" min="1" name="items[INDEX][quantity]" value="1" required><label class="active">Qtd.</label></div><div class="col s1"><a href="#!" onclick="this.closest('.item-row').remove()">×</a></div></div></template>
@push('scripts')<script>
let itemIndex={{ count($oldItems) }};
function addItem(){let html=document.getElementById('item-template').innerHTML.replaceAll('INDEX',itemIndex++);document.getElementById('items').insertAdjacentHTML('beforeend',html);M.FormSelect.init(document.querySelectorAll('select'));}
document.addEventListener('DOMContentLoaded',()=>M.FormSelect.init(document.querySelectorAll('select')));
</script>@endpush
@endsection
