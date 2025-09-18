@extends('layouts.app')

@section('content')
<h1>Editar Produto #{{ $produto->id }}</h1>

@if ($errors->any())
<div style="color:red;">
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<form id="form-editar-produto" action="{{ route('produtos.update', $produto) }}" method="POST">
    @csrf
    @method('PUT')
    <div>
        <label>Título:</label>
        <input type="text" name="titulo" value="{{ old('titulo', $produto->titulo) }}" required>
    </div>
    <div>
        <label>Preço:</label>
        <input type="number" name="preco" value="{{ old('preco', $produto->preco) }}" step="0.01" required>
    </div>
    <div>
        <label>Estoque:</label>
        <input type="number" name="estoque" value="{{ old('estoque', $produto->estoque) }}" min="0" required>
    </div>
    <div>
        <label>Descrição:</label>
        <textarea name="descricao">{{ old('descricao', $produto->descricao) }}</textarea>
    </div>
    <button type="submit">Atualizar Produto</button>
</form>

<a href="{{ route('produtos.index') }}">Voltar</a>
@endsection

@section('scripts')
<script src="{{ asset('js/produtos_edit.js') }}"></script>
@endsection