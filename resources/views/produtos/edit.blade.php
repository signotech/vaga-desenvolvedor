@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Editar Produto</h3>

        <div class="card p-4 shadow-sm">
            <form action="{{ route('produtos.update', $produto->id) }}" method="post">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="titulo" class="form-label">Título</label>
                    <input type="text" name="titulo" value="{{ old('titulo', $produto->titulo) }}" class="form-control">
                    @error('titulo')
                        <div class="alert alert-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="preco" class="form-label">Preço</label>
                    <input type="number" name="preco" min="0.01" step="0.01" value="{{ old('preco', $produto->preco) }}" class="form-control">
                    @error('preco')
                        <div class="alert alert-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="estoque" class="form-label">Estoque</label>
                    <input type="number" name="estoque" min="0" value="{{ old('estoque', $produto->estoque) }}" class="form-control">
                    @error('estoque')
                        <div class="alert alert-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="codigo_sku" class="form-label">Código SKU</label>
                    <input type="text" name="codigo_sku" value="{{ old('codigo_sku', $produto->codigo_sku) }}" class="form-control">
                    @error('codigo_sku')
                        <div class="alert alert-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-between">
                    <a href="{{ route('produtos.index') }}" class="btn btn-secondary">Voltar</a>
                    <button type="submit" class="btn btn-success">Editar</button>
                </div>
            </form>
        </div>
    </div>

@endsection
