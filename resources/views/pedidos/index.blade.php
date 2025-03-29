@extends('layouts.main')

@section('content')
    
    <h3>Pedidos</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('pedidos.create') }}">Novo</a>

    <br><br>

    <table border="1">
        <thead>
            <tr>
                <th>Código</th>
                <th>Código Cliente</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($pedidos as $pedido)
                <tr>
                    <td><a href="{{ route('pedidos.show', $pedido->id) }}">{{ $pedido->id }}</a></td>
                    <td>{{ $pedido->cliente_id }}</td>
                    <td>{{ $pedido->status }}</td>
                    <td>{{ $pedido->created_at }}</td>
                    <td>
                        <a href="{{ route('pedidos.edit', $pedido->id) }}">
                            <button>Editar</button>
                        </a>
                        <form action="{{ route('pedidos.destroy', $pedido->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline">
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
