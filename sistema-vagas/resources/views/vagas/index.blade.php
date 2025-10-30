@extends('layout.app')

@section('content')
    <div class="flex-between">
        <h1>Listagem de Vagas</h1>
        <a href="{{ route('vagas.create') }}" class="btn btn-primary">Nova Vaga</a>
    </div>

    <div class="filters">
        <form method="GET" action="{{ route('vagas.index') }}">
            <div class="form-group">
                <label>Título</label>
                <input type="text" name="titulo" value="{{ request('titulo') }}">
            </div>
            <div class="form-group">
                <label>Tipo</label>
                <select name="tipo">
                    <option value="">Todos</option>
                    <option value="clt" {{ request('tipo') == 'clt' ? 'selected' : '' }}>CLT</option>
                    <option value="pj" {{ request('tipo') == 'pj' ? 'selected' : '' }}>Pessoa Jurídica</option>
                    <option value="freelancer" {{ request('tipo') == 'freelancer' ? 'selected' : '' }}>Freelancer</option>
                </select>
            </div>
            <div class="form-group">
                <label>Ordenar Por</label>
                <select name="sort_by">
                    <option value="created_at" {{ request('sort_by') == 'created_at' ? 'selected' : '' }}>Data Criação</option>
                    <option value="titulo" {{ request('sort_by') == 'titulo' ? 'selected' : '' }}>Título</option>
                    <option value="status" {{ request('sort_by') == 'status' ? 'selected' : '' }}>Status</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Filtrar</button>
        </form>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($vagas as $vaga)
                <tr>
                    <td>{{ $vaga->id }}</td>
                    <td>{{ $vaga->titulo }}</td>
                    <td>{{ $vaga->tipo }}</td>
                    <td>{{ $vaga->status }}</td>
                    <td>
                        <a href="{{ route('vagas.edit', $vaga) }}" class="btn btn-warning btn-sm">Editar</a>

                        <form action="{{ route('vagas.pausar', $vaga) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('PATCH')
                            <button type="submit" class="btn btn-secondary btn-sm">
                                {{ $vaga->status === 'ativa' ? 'Pausar' : 'Reativar' }}
                            </button>
                        </form>

                        <form action="{{ route('vagas.destroy', $vaga) }}" method="POST" style="display:inline;" onsubmit="return confirm('Tem certeza que deseja excluir?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm">Excluir</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">Nenhuma vaga encontrada.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="pagination">
        {{ $vagas->links() }}
    </div>
@endsection