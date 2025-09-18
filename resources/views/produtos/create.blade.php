@extends('layouts.app')

@section('content')
<h1>Novo Produto</h1>

@if ($errors->any())
<div style="color:red; margin-bottom: 15px;">
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<form id="form-criar-produto" action="{{ route('produtos.store') }}" method="POST">
    @csrf
    <div>
        <label>Título:</label>
        <input type="text" name="titulo" value="{{ old('titulo') }}" required>
    </div>
    <div>
        <label>Preço:</label>
        <input type="number" name="preco" value="{{ old('preco') }}" step="0.01" required>
    </div>
    <div>
        <label>Estoque:</label>
        <input type="number" name="estoque" value="{{ old('estoque') }}" min="0" required>
    </div>
    <div>
        <label>Descrição:</label>
        <textarea name="descricao">{{ old('descricao') }}</textarea>
    </div>
    <button type="submit">Salvar Produto</button>
</form>

<a href="{{ route('produtos.index') }}" style="display:inline-block; margin-top:15px;">Voltar</a>
@endsection

@section('scripts')
<script src="{{ asset('js/produtos_create.js') }}"></script>
@endsection