@extends('layouts.app')
@section('titulo', $produto->exists ? 'Editar produto' : 'Novo produto')

@section('conteudo')
    <h1>{{ $produto->exists ? 'Editar produto' : 'Novo produto' }}</h1>
    <div class="card">
        <form method="POST" action="{{ $produto->exists ? route('produtos.update', $produto) : route('produtos.store') }}">
            @csrf
            @if ($produto->exists) @method('PUT') @endif

            @foreach (['sku' => 'SKU', 'titulo' => 'Título', 'preco' => 'Preço', 'estoque' => 'Estoque'] as $campo => $rotulo)
                <div class="campo">
                    <label for="{{ $campo }}">{{ $rotulo }}</label>
                    <input id="{{ $campo }}" name="{{ $campo }}" value="{{ old($campo, $produto->$campo) }}"
                           @if (in_array($campo, ['preco', 'estoque'])) type="number" step="{{ $campo === 'preco' ? '0.01' : '1' }}" min="0" @endif>
                    @error($campo) <div class="invalido">{{ $message }}</div> @enderror
                </div>
            @endforeach

            <button class="btn">Salvar</button>
            <a class="btn sec" href="{{ route('produtos.index') }}">Cancelar</a>
        </form>
    </div>
@endsection
