@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Ver Cliente</h3>

        <!-- Exibição dos detalhes do cliente -->
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" name="nome" value="{{ old('nome', $cliente->nome) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" name="email" value="{{ old('email', $cliente->email) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="cpf" class="form-label">CPF</label>
            <input type="text" name="cpf" value="{{ old('cpf', $cliente->cpf) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="created_at" class="form-label">Criado em</label>
            <input type="text" value="{{ old('created_at', \Carbon\Carbon::parse($cliente->created_at)->format('d/m/Y H:i:s')) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="updated_at" class="form-label">Editado em</label>
            <input type="text" value="{{ old('updated_at', \Carbon\Carbon::parse($cliente->updated_at)->format('d/m/Y H:i:s')) }}" class="form-control" readonly>
        </div>

        <div class="d-flex justify-content-center gap-2">
            <!-- Botão de Voltar -->
            <a href="{{ route('clientes.index') }}" class="btn btn-secondary">Voltar</a>
        
            <!-- Botão de Editar -->
            <a href="{{ route('clientes.edit', $cliente->id) }}" class="btn btn-primary">Editar</a>
        
            <!-- Formulário de Excluir -->
            <form action="{{ route('clientes.destroy', $cliente->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger">Excluir</button>
            </form>
        </div>

@endsection
