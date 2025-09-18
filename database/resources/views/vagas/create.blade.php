@extends('layouts.app')

@section('title', 'Criar Vaga')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h1 class="mb-4">Criar Vaga</h1>

            <form method="POST" action="{{ route('vagas.store') }}" id="create-vaga-form">
                @csrf

                <div class="mb-3">
                    <label for="titulo" class="form-label">Título</label>
                    <input type="text" name="titulo" id="titulo" class="form-control" placeholder="Título" required>
                </div>

                <div class="mb-3">
                    <label for="descricao" class="form-label">Descrição</label>
                    <textarea name="descricao" id="descricao" class="form-control" placeholder="Descrição"></textarea>
                </div>

                <div class="mb-3">
                    <label for="tipo" class="form-label">Tipo</label>
                    <select name="tipo" id="tipo" class="form-select" required>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Freelancer">Freelancer</option>
                    </select>
                </div>

                <div class="form-check mb-3">
                    <input type="checkbox" class="form-check-input" id="ativa" name="ativa" value="1" checked>
                    <label class="form-check-label" for="ativa">Ativa</label>
                </div>

                <button type="submit" class="btn btn-success">Salvar</button>
                <a href="{{ route('vagas.index') }}" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    <script src="{{ asset('js/vagas_create.js') }}"></script>
@endsection
