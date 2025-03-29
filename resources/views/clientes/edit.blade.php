@extends('layouts.main')

@section('content')
    <h3>Editar Cliente</h3>

    <form action="{{ route('clientes.update', $cliente->id) }}" method="post">
        @csrf
        @method('PUT')

        <label for="nome">Nome: </label>
        <input type="text" name="nome" value="{{ old('nome', $cliente->nome) }}">
        @error('nome')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="email">E-mail: </label>
        <input type='email' name="email" value="{{ old('email', $cliente->email) }}">
        @error('email')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="cpf">CPF: </label>
        <input type="text" name="cpf" value="{{ old('cpf', $cliente->cpf) }}">
        @error('cpf')
            <p style="color: red;">{{ $message }}</p>
        @enderror

        <br><br>
        <button type="submit">Editar</button>

    </form>

@endsection
