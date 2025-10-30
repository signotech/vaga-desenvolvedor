@extends('layout.app')

@section('content')
    <div class="flex-between">
        <h1>Listagem de Candidatos</h1>
        <a href="{{ route('candidatos.create') }}" class="btn btn-primary">Novo Candidato</a>
    </div>

    <div class="filters">
        <form method="GET" action="{{ route('candidatos.index') }}">
            <div class="form-group">
                <label>Nome</label>
                <input type="text" name="nome" value="{{ request('nome') }}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" name="email" value="{{ request('email') }}">
            </div>
            <button type="submit" class="btn btn-primary">Filtrar</button>
        </form>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Inscrito em</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($candidatos as $candidato)
                <tr>
                    <td>{{ $candidato->id }}</td>
                    <td>{{ $candidato->nome }}</td>
                    <td>{{ $candidato->email }}</td>
                    <td>{{ $candidato->vagas->count() }} vaga(s)</td>
                    <td>
                        <a href="{{ route('candidatos.edit', $candidato) }}" class="btn btn-warning btn-sm">Editar</a>
                        
                        <a href="{{ route('inscricao.create', $candidato) }}" class="btn btn-secondary btn-sm">Inscrever</a>

                        <form action="{{ route('candidatos.destroy', $candidato) }}" method="POST" style="display:inline;" onsubmit="return confirm('Tem certeza que deseja excluir?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm">Excluir</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">Nenhum candidato encontrado.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="pagination">
        {{ $candidatos->links() }}
    </div>
@endsection