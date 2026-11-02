@extends('layouts.app')
@section('titulo', $produto->exists ? 'Editar produto' : 'Novo produto')

@section('conteudo')
    <div class="topo"><h1>{{ $produto->exists ? 'Editar produto' : 'Novo produto' }}</h1></div>
    <div class="card">
        <form method="POST" class="card-content" action="{{ $produto->exists ? route('produtos.update', $produto) : route('produtos.store') }}">
            @csrf
            @if ($produto->exists) @method('PUT') @endif

            @foreach (['sku' => 'SKU', 'titulo' => 'Título', 'preco' => 'Preço', 'estoque' => 'Estoque'] as $campo => $rotulo)
                <div class="input-field">
                    <input id="{{ $campo }}" name="{{ $campo }}" value="{{ old($campo, $produto->$campo) }}" class="@error($campo) invalid @enderror"
                           @if (in_array($campo, ['preco', 'estoque'])) type="number" step="{{ $campo === 'preco' ? '0.01' : '1' }}" min="0" @endif>
                    <label for="{{ $campo }}">{{ $rotulo }}</label>
                    @error($campo) <span class="helper-text red-text">{{ $message }}</span> @enderror
                </div>
            @endforeach

            <button class="btn blue-grey darken-3">Salvar</button>
            <a class="btn grey" href="{{ route('produtos.index') }}">Cancelar</a>
        </form>
    </div>
@endsection
