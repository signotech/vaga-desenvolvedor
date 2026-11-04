@extends('layouts.app')
@section('title','Dashboard')
@section('content')
<div class="row" style="margin-bottom:8px"><div class="col s12"><h4 style="margin-bottom:4px">Visão geral</h4><p class="muted">Resumo da operação de pedidos de compra.</p></div></div>
<div class="row">
@foreach([['Clientes',$customers,'people','clientes.index'],['Produtos',$products,'inventory_2','produtos.index'],['Pedidos',$orders,'shopping_bag','pedidos.index'],['Em aberto',$openOrders,'pending_actions','pedidos.index']] as [$label,$value,$icon,$route])
<div class="col s12 m6 l3"><a href="{{ route($route) }}" class="black-text"><div class="card"><div class="card-content"><div class="muted"><i class="material-icons tiny">{{ $icon }}</i> {{ $label }}</div><div class="stat">{{ $value }}</div></div></div></a></div>
@endforeach
</div>
<div class="card"><div class="card-content"><span class="card-title">Pedidos recentes</span>
<table class="striped responsive-table"><thead><tr><th>#</th><th>Cliente</th><th>Data</th><th>Status</th><th></th></tr></thead><tbody>
@forelse($recentOrders as $order)<tr><td>{{ $order->id }}</td><td><a href="{{ route('clientes.show',$order->customer) }}">{{ $order->customer->name }}</a></td><td>{{ $order->ordered_at->format('d/m/Y H:i') }}</td><td><span class="status {{ $order->status->slug }}">{{ $order->status->name }}</span></td><td><a href="{{ route('pedidos.show',$order) }}">Detalhes</a></td></tr>
@empty<tr><td colspan="5">Nenhum pedido cadastrado.</td></tr>@endforelse
</tbody></table></div></div>
@endsection
