@extends('layouts.app')

@section('content')
<h1>{{ isset($cliente) ? 'Editar Cliente' : 'Novo Cliente' }}</h1>

@if ($errors->any())
<div style="color:red;">
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<form id="form-criar-editar-cliente" action="{{ isset($cliente) ? route('clientes.update', $cliente) : route('clientes.store') }}" method="POST">
    @csrf
    @if(isset($cliente))
    @method('PUT')
    @endif

    <label>Nome:</label>
    <input type="text" name="nome" value="{{ old('nome', $cliente->nome ?? '') }}" required><br>

    <label>Email:</label>
    <input type="email" name="email" value="{{ old('email', $cliente->email ?? '') }}" required><br>

    <label>CPF:</label>
    <input type="text" name="cpf" value="{{ old('cpf', $cliente->cpf ?? '') }}" required><br>

    <label>Telefone:</label>
    <input type="text" name="telefone" value="{{ old('telefone', $cliente->telefone ?? '') }}"><br>

    <button type="submit">{{ isset($cliente) ? 'Atualizar' : 'Salvar' }}</button>
</form>

<a href="{{ route('clientes.index') }}">Voltar</a>
@endsection

@section('scripts')
<script src="{{ asset('js/cliente_edit.js') }}"></script>
@endsection