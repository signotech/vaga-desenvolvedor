@extends('layouts.app')
@section('content')
<h1>Pedidos</h1>
<a href="{{ route('pedidos.create') }}">Novo Pedido</a>

<form id="form-filtro-pedidos" method="GET" style="margin-top:10px;margin-bottom:10px;">
    <input type="text" name="search" placeholder="Pesquisar por cliente ou status..." value="{{ request('search') }}">

    <select name="cliente_id">
        <option value="">Todos os clientes</option>
        @foreach($clientes as $cliente)
        <option value="{{ $cliente->id }}" {{ request('cliente_id') == $cliente->id ? 'selected' : '' }}>
            {{ $cliente->nome }}
        </option>
        @endforeach
    </select>

    <select name="status">
        <option value="">Todos os status</option>
        <option value="Em Aberto" {{ request('status') == 'Em Aberto' ? 'selected' : '' }}>Em Aberto</option>
        <option value="Pago" {{ request('status') == 'Pago' ? 'selected' : '' }}>Pago</option>
        <option value="Cancelado" {{ request('status') == 'Cancelado' ? 'selected' : '' }}>Cancelado</option>
    </select>

    <label>Itens por página:</label>
    <select name="per_page">
        <option value="10" {{ request('per_page')==10?'selected':'' }}>10</option>
        <option value="20" {{ request('per_page')==20?'selected':'' }}>20</option>
        <option value="50" {{ request('per_page')==50?'selected':'' }}>50</option>
    </select>

    <button type="submit">Filtrar</button>
</form><br>

@php
$sortOrder = request('sort_order') === 'asc' ? 'desc' : 'asc';
@endphp

<table border="1">
    <tr>
        <th><a href="{{ request()->fullUrlWithQuery(['sort_field'=>'id', 'sort_order'=>$sortOrder]) }}">ID</a></th>
        <th><a href="{{ request()->fullUrlWithQuery(['sort_field'=>'cliente_id', 'sort_order'=>$sortOrder]) }}">Cliente</a></th>
        <th><a href="{{ request()->fullUrlWithQuery(['sort_field'=>'data_pedido', 'sort_order'=>$sortOrder]) }}">Data</a></th>
        <th><a href="{{ request()->fullUrlWithQuery(['sort_field'=>'status', 'sort_order'=>$sortOrder]) }}">Status</a></th>
        <th>Produtos</th>
        <th>Ações</th>
    </tr>

    @foreach($pedidos as $pedido)
    <tr>
        <td>{{ $pedido->id }}</td>
        <td>{{ $pedido->cliente->nome }}</td>
        <td>{{ \Carbon\Carbon::parse($pedido->data_pedido)->format('d/m/Y') }}</td>
        <td>{{ $pedido->status }}</td>
        <td>
            @foreach($pedido->produtos as $produto)
            {{ $produto->titulo }} ({{ $produto->pivot->quantidade }})<br>
            @endforeach
        </td>
        <td>
            <a href="{{ route('pedidos.edit', $pedido) }}">Editar</a>
            <form action="{{ route('pedidos.destroy', $pedido) }}" method="POST" style="display:inline;" class="form-excluir-pedido">
                @csrf
                @method('DELETE')
                <button type="submit">Excluir</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>

<div class="pagination">
    @for ($i = 1; $i <= $pedidos->lastPage(); $i++)
        <a href="{{ $pedidos->url($i) }}"
            style="margin:0 5px; font-size:0.875rem; text-decoration:none;">
            {{ $i }}
        </a>
        @endfor
</div>

@endsection

@section('scripts')
<script src="{{ asset('js/pedido_index.js') }}"></script>
@endsection