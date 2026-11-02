@extends('layouts.app')
@section('titulo', $cliente->exists ? 'Editar cliente' : 'Novo cliente')

@section('conteudo')
    <div class="topo"><h1>{{ $cliente->exists ? 'Editar cliente' : 'Novo cliente' }}</h1></div>
    <div class="card">
        <form method="POST" novalidate class="card-content" action="{{ $cliente->exists ? route('clientes.update', $cliente) : route('clientes.store') }}">
            @csrf
            @if ($cliente->exists) @method('PUT') @endif

            @foreach (['nome' => 'Nome', 'cpf' => 'CPF (somente números)', 'email' => 'E-mail'] as $campo => $rotulo)
                <div class="input-field">
                    <input id="{{ $campo }}" type="{{ $campo === 'email' ? 'email' : 'text' }}" name="{{ $campo }}" value="{{ old($campo, $cliente->$campo) }}" class="@error($campo) invalid @enderror">
                    <label for="{{ $campo }}">{{ $rotulo }}</label>
                    @error($campo) <span class="helper-text red-text">{{ $message }}</span> @enderror
                </div>
            @endforeach

            <button class="btn blue-grey darken-3">Salvar</button>
            <a class="btn grey" href="{{ route('clientes.index') }}">Cancelar</a>
        </form>
    </div>
@endsection
