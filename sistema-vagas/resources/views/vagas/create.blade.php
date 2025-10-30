@extends('layout.app')

@section('content')
    <h1>Nova Vaga</h1>

    <form action="{{ route('vagas.store') }}" method="POST">
        @csrf <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" name="titulo" id="titulo" value="{{ old('titulo') }}" required>
        </div>

        <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea name="descricao" id="descricao" rows="5">{{ old('descricao') }}</textarea>
        </div>

        <div class="form-group">
            <label for="tipo">Tipo de Contratação</label>
            <select name="tipo" id="tipo" required>
                <option value="">Selecione...</option>
                <option value="clt" {{ old('tipo') == 'clt' ? 'selected' : '' }}>CLT</option>
                <option value="pj" {{ old('tipo') == 'pj' ? 'selected' : '' }}>Pessoa Jurídica</option>
                <option value="freelancer" {{ old('tipo') == 'freelancer' ? 'selected' : '' }}>Freelancer</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Salvar Vaga</button>
        <a href="{{ route('vagas.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
@endsection