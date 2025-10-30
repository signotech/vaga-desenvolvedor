@extends('layout.app')

@section('content')
    <h1>Editar Vaga: {{ $vaga->titulo }}</h1>

    <form action="{{ route('vagas.update', $vaga) }}" method="POST">
        @csrf @method('PUT') <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" name="titulo" id="titulo" value="{{ old('titulo', $vaga->titulo) }}" required>
        </div>

        <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea name="descricao" id="descricao" rows="5">{{ old('descricao', $vaga->descricao) }}</textarea>
        </div>

        <div class="form-group">
            <label for="tipo">Tipo de Contratação</label>
            <select name="tipo" id="tipo" required>
                <option value="">Selecione...</option>
                <option value="clt" {{ old('tipo', $vaga->tipo) == 'clt' ? 'selected' : '' }}>CLT</option>
                <option value="pj" {{ old('tipo', $vaga->tipo) == 'pj' ? 'selected' : '' }}>Pessoa Jurídica</option>
                <option value="freelancer" {{ old('tipo', $vaga->tipo) == 'freelancer' ? 'selected' : '' }}>Freelancer</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Atualizar Vaga</button>
        <a href="{{ route('vagas.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
@endsection