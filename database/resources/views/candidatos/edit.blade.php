@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <h1 class="mb-4">Editar Candidato</h1>

    <form id="editCandidatoForm" method="POST" action="{{ route('candidatos.update', $candidato) }}">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" 
                   value="{{ $candidato->nome }}" placeholder="Nome" required>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" 
                   value="{{ $candidato->email }}" placeholder="Email" required>
        </div>

        <div class="mb-3">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="text" class="form-control" id="telefone" name="telefone" 
                   value="{{ $candidato->telefone }}" placeholder="Telefone" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Vagas:</label>
            <div class="row">
                @foreach($vagas as $vaga)
                    <div class="col-md-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" 
                                   name="vagas[]" value="{{ $vaga->id }}" 
                                   id="vaga{{ $vaga->id }}"
                                   {{ $candidato->vagas->contains($vaga->id) ? 'checked' : '' }}>
                            <label class="form-check-label" for="vaga{{ $vaga->id }}">
                                {{ $vaga->titulo }}
                            </label>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Atualizar</button>
        <a href="{{ route('candidatos.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
@endsection

@push('scripts')
    <script src="{{ asset('js/candidatos_index.js') }}"></script>
@endpush
