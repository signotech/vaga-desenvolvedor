@extends('layout.app')

@section('content')
    <h1>Novo Candidato</h1>

    <form action="{{ route('candidatos.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome" value="{{ old('nome') }}" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" required>
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="text" name="telefone" id="telefone" value="{{ old('telefone') }}">
        </div>

        <button type="submit" class="btn btn-primary">Salvar Candidato</button>
        <a href="{{ route('candidatos.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
@endsection