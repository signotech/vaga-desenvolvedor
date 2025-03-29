@extends('layouts.main')

@section('content')
    <h3>Ver Cliente</h3>

    <label for="nome">Nome: </label>
    <input type="text" name="nome" value="{{ old('nome', $cliente->nome) }}" readonly>
    
    <br><br>
    <label for="email">E-mail: </label>
    <input type='email' name="email" value="{{ old('email', $cliente->email) }}" readonly>
    
    <br><br>
    <label for="cpf">CPF: </label>
    <input type="text" name="cpf" value="{{ old('cpf', $cliente->cpf) }}" readonly>

    <br><br>
    <label for="cpf">Criado em: </label>
    <input type="text" value="{{ old('cpf', $cliente->created_at) }}" readonly>

    <br><br>
    <label for="cpf">Editado em: </label>
    <input type="text" value="{{ old('cpf', $cliente->updated_at) }}" readonly>

@endsection
