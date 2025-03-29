@extends('layouts.main')

@section('content')
    <h3>Novo Cliente</h3>

    <form action="{{ route('clientes.store') }}" method="post">
        @csrf

        <label for="nome">Nome</label>
        <input type="text" name="nome" value="{{ old('nome') }}">
        @error('nome')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="email">E-mail</label>
        <input type='email' name="email" value="{{ old('email') }}">
        @error('email')
            <p style="color: red;">{{ $message }}</p>
        @enderror
        
        <br><br>
        <label for="cpf">CPF</label>
        <input type="text" name="cpf" value="{{ old('cpf') }}">
        @error('cpf')
            <p style="color: red;">{{ $message }}</p>
        @enderror

        <br><br>
        <button type="submit">Criar</button>

    </form>

@endsection
