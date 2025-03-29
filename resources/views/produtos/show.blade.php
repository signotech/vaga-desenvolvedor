@extends('layouts.main')

@section('content')
    <h3>Ver Produto</h3>

    <label for="titulo">Título: </label>
    <input type="text" name="titulo" value="{{ old('titulo', $produto->titulo) }}" readonly>
    
    <br><br>
    <label for="preco">Preço: </label>
    <input type='number' name="preco" value="{{ old('preco', $produto->preco) }}" readonly>
    
    <br><br>
    <label for="estoque">Estoque: </label>
    <input type="number" name="estoque" value="{{ old('estoque', $produto->estoque) }}" readonly>
    
    <br><br>
    <label for="codigo_sku">Código SKU: </label>
    <input type="text" name="codigo_sku" value="{{ old('codigo_sku', $produto->codigo_sku) }}" readonly>

    <br><br>
    <label for="created_at">Criado em: </label>
    <input type="text" value="{{ old('cpf', $produto->created_at) }}" readonly>

    <br><br>
    <label for="updated_at">Editado em: </label>
    <input type="text" value="{{ old('cpf', $produto->updated_at) }}" readonly>

@endsection
