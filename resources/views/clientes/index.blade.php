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

        <label for="order_by">Ordenar por:</label>
        <select name="order_by">
            <option value="id" {{ request()->input('order_by') == 'id' ? 'selected' : '' }}>Código</option>
            <option value="nome" {{ request()->input('order_by') == 'nome' ? 'selected' : '' }}>Nome</option>
            <option value="email" {{ request()->input('order_by') == 'email' ? 'selected' : '' }}>E-mail</option>
            <option value="cpf" {{ request()->input('order_by') == 'cpf' ? 'selected' : '' }}>CPF</option>
        </select>

        <label for="direction">Direção:</label>
        <select name="direction">
            <option value="asc" {{ request()->input('direction') == 'asc' ? 'selected' : '' }}>Crescente</option>
            <option value="desc" {{ request()->input('direction') == 'desc' ? 'selected' : '' }}>Decrescente</option>
        </select>

        <button type="submit">Filtrar</button>
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
                    <td><a href="{{ route('clientes.show', $cliente->id) }}">{{ $cliente->nome }}</a></td>
                    <td>{{ $cliente->email }}</td>
                    <td>{{ $cliente->cpf }}</td>
                    <td>
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

@endsection
