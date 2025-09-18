@extends('layouts.app')
@section('content')
<h1>{{ isset($pedido) ? 'Editar Pedido' : 'Novo Pedido' }}</h1>

<form action="{{ isset($pedido) ? route('pedidos.update', $pedido) : route('pedidos.store') }}" method="POST">
    @csrf
    @if(isset($pedido)) @method('PUT') @endif

    <label>Cliente:</label>
    <select name="cliente_id" required>
        <option value="">Selecione um cliente</option>
        @foreach($clientes as $cliente)
        <option value="{{ $cliente->id }}"
            {{ (old('cliente_id', $pedido->cliente_id ?? '') == $cliente->id) ? 'selected' : '' }}>
            {{ $cliente->nome }}
        </option>
        @endforeach
    </select><br><br>

    <label>Status:</label>
    <select name="status" required>
        @foreach(['Em Aberto','Pago','Cancelado'] as $status)
        <option value="{{ $status }}" {{ (old('status', $pedido->status ?? '') == $status) ? 'selected' : '' }}>
            {{ $status }}
        </option>
        @endforeach
    </select><br><br>

    <h3>Produtos:</h3>
    @foreach($produtos as $produto)
    <div>
        <label>
            <input type="checkbox" name="produtos[{{ $produto->id }}][id]" value="{{ $produto->id }}"
                {{ isset($pedido) && $pedido->produtos->contains($produto->id) ? 'checked' : '' }}>
            {{ $produto->titulo }} (R$ {{ $produto->preco }})
        </label>
        Quantidade:
        <input type="number" name="produtos[{{ $produto->id }}][quantidade]" min="1"
            value="{{ isset($pedido) && $pedido->produtos->contains($produto->id) ? $pedido->produtos->find($produto->id)->pivot->quantidade : 1 }}">
    </div>
    @endforeach

    <br>
    <button type="submit">{{ isset($pedido) ? 'Atualizar' : 'Salvar' }}</button>
</form>

<a href="{{ route('pedidos.index') }}">Voltar</a>
@endsection
@section('scripts')
<script src="{{ asset('js/pedidos_edit.js') }}"></script>
@endsection