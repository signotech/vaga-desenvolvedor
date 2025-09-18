@extends('layouts.app')

@section('title', 'Lista de Vagas')

@section('content')
<div class="d-flex justify-content-between mb-3">
    <h1>Vagas</h1>
    <a href="{{ route('vagas.create') }}" class="btn btn-primary">Nova Vaga</a>
</div>

<form method="GET" class="mb-3">
    <input type="text" name="titulo" class="form-control" placeholder="Filtrar por título" value="{{ request('titulo') }}">
</form>

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Ativa</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        @foreach($vagas as $vaga)
            <tr>
                <td>{{ $vaga->id }}</td>
                <td>{{ $vaga->titulo }}</td>
                <td>{{ $vaga->tipo }}</td>
                <td>{{ $vaga->ativa ? 'Sim' : 'Não' }}</td>
                <td>
                    <a href="{{ route('vagas.edit', $vaga) }}" class="btn btn-sm btn-warning">Editar</a>

                    <form action="{{ route('vagas.destroy', $vaga) }}" method="POST" class="d-inline delete-form">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger">Excluir</button>
                    </form>

                    <form action="{{ route('vagas.toggle', $vaga) }}" method="POST" class="d-inline toggle-form">
                        @csrf
                        <button type="submit" class="btn btn-sm btn-info">{{ $vaga->ativa ? 'Pausar' : 'Ativar' }}</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

{{ $vagas->withQueryString()->links() }}
@endsection

@section('scripts')
    <script src="{{ asset('js/vagas_index.js') }}"></script>
@endsection
