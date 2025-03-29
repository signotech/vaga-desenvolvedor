@extends('layouts.main')

@section('content')
    
    <h3>Clientes</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('clientes.create') }}">Novo</a>

    <br><br>

    <table border="1">
        <thead>
            <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($clientes as $cliente)
                <tr>
                    <td><a href="{{ route('clientes.show', $cliente->id) }}">{{ $cliente->nome }}</a></td>
                    <td>{{ $cliente->email }}</td>
                    <td>{{ $cliente->cpf }}</td>
                    <td>
                        <a href="{{ route('clientes.edit', $cliente->id) }}">
                            <button>Editar</button>
                        </a>
                        <form action="{{ route('clientes.destroy', $cliente->id) }}" method="post" style="display: inline">
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
