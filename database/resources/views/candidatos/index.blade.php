@extends('layouts.app')

@section('title', 'Candidatos')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h1>Candidatos</h1>
    <a href="{{ route('candidatos.create') }}" class="btn btn-primary">Criar novo candidato</a>
</div>

<div class="card mb-4">
    <div class="card-body">
        <form method="GET" action="{{ route('candidatos.index') }}" class="row g-2">
            <div class="col-md-4">
                <input type="text" name="nome" class="form-control" placeholder="Buscar por nome" value="{{ request('nome') }}">
            </div>
            <div class="col-md-4">
                <input type="text" name="email" class="form-control" placeholder="Buscar por email" value="{{ request('email') }}">
            </div>
            <div class="col-md-4">
                <button type="submit" class="btn btn-success w-100">Filtrar</button>
            </div>
        </form>
    </div>
</div>

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>
                <a href="{{ route('candidatos.index', ['sort' => 'id', 'order' => request('order') == 'asc' ? 'desc' : 'asc']) }}">
                    ID
                </a>
            </th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Vagas Inscritas</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        @foreach($candidatos as $candidato)
        <tr>
            <td>{{ $candidato->id }}</td>
            <td>{{ $candidato->nome }}</td>
            <td>{{ $candidato->email }}</td>
            <td>{{ $candidato->telefone }}</td>
            <td>
                @foreach($candidato->vagas as $vaga)
                    {{ $vaga->titulo }}@if(!$loop->last), @endif
                @endforeach
            </td>
            <td>
                <a href="{{ route('candidatos.edit', $candidato) }}" 
                   class="btn btn-sm btn-warning edit-btn">Editar</a>

                <form action="{{ route('candidatos.destroy', $candidato) }}" 
                      method="POST" class="d-inline delete-form">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-sm btn-danger">Excluir</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

{{ $candidatos->links() }}
@endsection

@section('scripts')
    <script src="{{ asset('js/candidatos.index.js') }}"></script>
@endsection
