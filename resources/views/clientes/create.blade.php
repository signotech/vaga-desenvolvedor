@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Novo Cliente</h3>

        <!-- Formulário de Criação de Cliente -->
        <form action="{{ route('clientes.store') }}" method="post">
            @csrf

            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" name="nome" value="{{ old('nome') }}" class="form-control">
                @error('nome')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" name="email" value="{{ old('email') }}" class="form-control">
                @error('email')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="cpf" class="form-label">CPF</label>
                <input type="text" name="cpf" maxlength="11" value="{{ old('cpf') }}" class="form-control">
                @error('cpf')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary">Criar</button>
            </div>
        </form>
    </div>

@endsection
