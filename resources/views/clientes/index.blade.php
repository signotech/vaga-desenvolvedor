@extends('layouts.main')

@section('content')
    
    <h3>Clientes</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('clientes.create') }}">Novo</a>

    <br><br>

    <form method="GET" action="{{ route('clientes.index') }}">
        <label for="id">Filtrar por Código:</label>
        <input type="text" name="id" value="{{ request()->input('id') }}"/>
        <br>

        <label for="nome">Filtrar por Nome:</label>
        <input type="text" name="nome" value="{{ request()->input('nome') }}"/>
        <br>

        <label for="email">Filtrar por E-mail:</label>
        <input type="text" name="email" value="{{ request()->input('email') }}"/>
        <br>

        <label for="cpf">Filtrar por CPF:</label>
        <input type="text" name="cpf" value="{{ request()->input('cpf') }}"/>
        <br>

        <label for="ordem_por">Ordenar por:</label>
        <select name="ordem_por">
            <option value="id" {{ request()->input('ordem_por') == 'id' ? 'selected' : '' }}>Código</option>
            <option value="nome" {{ request()->input('ordem_por') == 'nome' ? 'selected' : '' }}>Nome</option>
            <option value="email" {{ request()->input('ordem_por') == 'email' ? 'selected' : '' }}>E-mail</option>
            <option value="cpf" {{ request()->input('ordem_por') == 'cpf' ? 'selected' : '' }}>CPF</option>
        </select>

        <label for="ordem">Ordem:</label>
        <select name="ordem">
            <option value="asc" {{ request()->input('ordem') == 'asc' ? 'selected' : '' }}>Crescente</option>
            <option value="desc" {{ request()->input('ordem') == 'desc' ? 'selected' : '' }}>Decrescente</option>
        </select>

        <label for="itens_por_pagina">Itens por página:</label>
        <select name="itens_por_pagina" id="itens_por_pagina">
            <option value="10" {{ request()->input('itens_por_pagina') == '10' ? 'selected' : '' }}>10</option>
            <option value="20" {{ request()->input('itens_por_pagina') == '20' || !request()->has('itens_por_pagina') ? 'selected' : '' }}>20</option>
            <option value="50" {{ request()->input('itens_por_pagina') == '50' ? 'selected' : '' }}>50</option>
            <option value="100" {{ request()->input('itens_por_pagina') == '100' ? 'selected' : '' }}>100</option>
        </select>

        <br>

        <button type="submit">Filtrar</button>

        <button type="button" onclick="window.location='{{ route('clientes.index') }}'">
            Resetar Filtros
        </button>
    </form>

    <br><br>

    <table border="1">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($clientes as $cliente)
                <tr>
                    <td>{{ $cliente->id }}</td>
                    <td>{{ $cliente->nome }}</td>
                    <td>{{ $cliente->email }}</td>
                    <td>{{ $cliente->cpf }}</td>
                    <td>
                        <a href="{{ route('clientes.show', $cliente->id) }}">
                            <button>Visualizar</button>
                        </a>
                        <a href="{{ route('clientes.edit', $cliente->id) }}">
                            <button>Editar</button>
                        </a>
                        <form action="{{ route('clientes.destroy', $cliente->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Excluir</button>
                        </form>
                    </td>
                </tr>
            @endforeach

        </tbody>
    </table>

    <div>
        {{ $clientes->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
    </div>

@endsection
