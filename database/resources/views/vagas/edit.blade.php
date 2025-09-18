@extends('layouts.app')

@section('title', 'Editar Vaga')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h1 class="mb-4">Editar Vaga</h1>

            <form method="POST" action="{{ route('vagas.update', $vaga) }}" id="edit-vaga-form">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="titulo" class="form-label">Título</label>
                    <input type="text" name="titulo" id="titulo" class="form-control" value="{{ $vaga->titulo }}" placeholder="Título" required>
                </div>

                <div class="mb-3">
                    <label for="descricao" class="form-label">Descrição</label>
                    <textarea name="descricao" id="descricao" class="form-control" placeholder="Descrição">{{ $vaga->descricao }}</textarea>
                </div>

                <div class="mb-3">
                    <label for="tipo" class="form-label">Tipo</label>
                    <select name="tipo" id="tipo" class="form-select" required>
                        <option value="CLT" {{ $vaga->tipo == 'CLT' ? 'selected' : '' }}>CLT</option>
                        <option value="PJ" {{ $vaga->tipo == 'PJ' ? 'selected' : '' }}>PJ</option>
                        <option value="Freelancer" {{ $vaga->tipo == 'Freelancer' ? 'selected' : '' }}>Freelancer</option>
                    </select>
                </div>

                <div class="form-check mb-3">
                    <input type="checkbox" class="form-check-input" id="ativa" name="ativa" value="1" {{ $vaga->ativa ? 'checked' : '' }}>
                    <label class="form-check-label" for="ativa">Ativa</label>
                </div>

                <button type="submit" class="btn btn-primary">Atualizar</button>
                <a href="{{ route('vagas.index') }}" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    <script src="{{ asset('js/vagas_edit.js') }}"></script>
@endsection
