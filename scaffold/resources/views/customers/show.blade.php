@extends('layouts.app')
@section('title','Detalhe do cliente')
@section('content')
<div class="row"><div class="col s8"><h4>{{ $customer->name }}</h4><p class="muted">Detalhes do cliente</p></div><div class="col s4 right-align"><a class="btn" href="{{ route('clientes.edit',$customer) }}">Editar</a></div></div>
<div class="card"><div class="card-content"><p><b>CPF:</b> {{ $customer->cpf ?: '—' }}</p><p><b>E-mail:</b> {{ $customer->email }}</p><p><b>Telefone:</b> {{ $customer->phone ?: '—' }}</p><h6>Pedidos deste cliente</h6>
<table class="striped"><thead><tr><th>Pedido</th><th>Data</th><th>Status</th><th></th></tr></thead><tbody>@forelse($customer->orders as $order)<tr><td>#{{ $order->id }}</td><td>{{ $order->ordered_at->format('d/m/Y') }}</td><td>{{ $order->status->name }}</td><td><a href="{{ route('pedidos.show',$order) }}">Abrir</a></td></tr>@empty<tr><td colspan="4">Sem pedidos.</td></tr>@endforelse</tbody></table></div></div>
@endsection
