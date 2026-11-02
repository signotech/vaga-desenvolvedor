@extends('layouts.app')
@section('titulo', $cliente->exists ? 'Editar cliente' : 'Novo cliente')

@section('conteudo')
    <h1>{{ $cliente->exists ? 'Editar cliente' : 'Novo cliente' }}</h1>
    <div class="card">
        <form method="POST" action="{{ $cliente->exists ? route('clientes.update', $cliente) : route('clientes.store') }}">
            @csrf
            @if ($cliente->exists) @method('PUT') @endif

            @foreach (['nome' => 'Nome', 'cpf' => 'CPF (somente números)', 'email' => 'E-mail'] as $campo => $rotulo)
                <div class="campo">
                    <label for="{{ $campo }}">{{ $rotulo }}</label>
                    <input id="{{ $campo }}" name="{{ $campo }}" value="{{ old($campo, $cliente->$campo) }}">
                    @error($campo) <div class="invalido">{{ $message }}</div> @enderror
                </div>
            @endforeach

            <button class="btn">Salvar</button>
            <a class="btn sec" href="{{ route('clientes.index') }}">Cancelar</a>
        </form>
    </div>
@endsection
