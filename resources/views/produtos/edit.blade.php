@extends('layouts.main')

@section('content')
    <h3>Editar Produto</h3>

    <form action="{{ route('produtos.update', $produto->id) }}" method="post">
        @csrf
        @method('PUT')

        <label for="titulo">Título: </label>
        <input type="text" name="titulo" value="{{ old('titulo', $produto->titulo) }}">
        @error('nome')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="preco">Preço: </label>
        <input type='number' name="preco" value="{{ old('preco', $produto->preco) }}">
        @error('preco')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="estoque">Estoque: </label>
        <input type="number" name="estoque" value="{{ old('estoque', $produto->estoque) }}">
        @error('estoque')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="codigo_sku">Código SKU: </label>
        <input type="text" name="codigo_sku" value="{{ old('codigoSku', $produto->codigo_sku) }}">
        @error('codigo_sku')
            <p style="color: red;">{{ $message }}</p>
        @enderror

        <br><br>
        <button type="submit">Editar</button>

    </form>

@endsection
