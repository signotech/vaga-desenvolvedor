@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <h1 class="mb-4">Criar Candidato</h1>

    <form id="createCandidatoForm" method="POST" action="{{ route('candidatos.store') }}">
        @csrf

        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" required>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
        </div>

        <div class="mb-3">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="text" class="form-control" id="telefone" name="telefone" placeholder="Telefone" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Vagas:</label>
            <div class="row">
                @foreach($vagas as $vaga)
                    <div class="col-md-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" 
                                   name="vagas[]" value="{{ $vaga->id }}" 
                                   id="vaga{{ $vaga->id }}">
                            <label class="form-check-label" for="vaga{{ $vaga->id }}">
                                {{ $vaga->titulo }}
                            </label>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <button type="submit" class="btn btn-success">Salvar</button>
        <a href="{{ route('candidatos.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
@endsection

@push('scripts')
    <script src="{{ asset('js/candidatos_create.js') }}"></script>
@endpush
