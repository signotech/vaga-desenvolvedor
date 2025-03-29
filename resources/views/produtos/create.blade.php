@extends('layouts.main')

@section('content')
    <h3>Novo Produto</h3>

    <form action="{{ route('produtos.store') }}" method="post">
        @csrf

        <label for="titulo">Título</label>
        <input type="text" name="titulo" value="{{ old('titulo') }}">
        @error('titulo')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="preco">Preço</label>
        <input type='number' name="preco" value="{{ old('preco') }}">
        @error('preco')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="estoque">Estoque</label>
        <input type="number" name="estoque" value="{{ old('estoque') }}">
        @error('estoque')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="codigo_sku">Código SKU</label>
        <input type="text" name="codigo_sku" value="{{ old('codigo_sku') }}">
        @error('codigo_sku')
            <p style="color: red;">{{ $message }}</p>
        @enderror

        <br><br>
        <button type="submit">Criar</button>

    </form>

@endsection
