@extends('layouts.app')
@section('title','Detalhe do pedido')
@section('content')
<div class="row"><div class="col s8"><h4>Pedido #{{ $order->id }}</h4><p class="muted">Criado em {{ $order->ordered_at->format('d/m/Y H:i') }}</p></div><div class="col s4 right-align"><a class="btn" href="{{ route('pedidos.edit',$order) }}">Editar</a></div></div>
<div class="card"><div class="card-content"><p><b>Cliente:</b> <a href="{{ route('clientes.show',$order->customer) }}">{{ $order->customer->name }}</a></p><p><b>Status:</b> {{ $order->status->name }}</p>
<table class="striped"><thead><tr><th>Produto</th><th>Qtd.</th><th>Preço unitário</th><th>Subtotal</th></tr></thead><tbody>@foreach($order->items as $item)<tr><td><a href="{{ route('produtos.show',$item->product) }}">{{ $item->product->title }}</a></td><td>{{ $item->quantity }}</td><td>R$ {{ number_format($item->unit_price,2,',','.') }}</td><td>R$ {{ number_format($item->quantity*$item->unit_price,2,',','.') }}</td></tr>@endforeach</tbody></table>
<div class="right-align" style="margin-top:20px"><p>Subtotal: <b>R$ {{ number_format($order->subtotal,2,',','.') }}</b></p><p>Desconto: <b>R$ {{ number_format($order->discount,2,',','.') }}</b></p><h5>Total: R$ {{ number_format($order->total,2,',','.') }}</h5></div></div></div>
@endsection
