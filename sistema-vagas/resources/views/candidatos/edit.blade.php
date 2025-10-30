@extends('layout.app')

@section('content')
    <h1>Editar Candidato: {{ $candidato->nome }}</h1>

    <form action="{{ route('candidatos.update', $candidato) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome" value="{{ old('nome', $candidato->nome) }}" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="{{ old('email', $candidato->email) }}" required>
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="text" name="telefone" id="telefone" value="{{ old('telefone', $candidato->telefone) }}">
        </div>

        <button type="submit" class="btn btn-primary">Atualizar Candidato</button>
        <a href="{{ route('candidatos.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
@endsection