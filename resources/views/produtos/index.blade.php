@extends('layouts.main')

@section('content')
    
    <h3>Produtos</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('produtos.create') }}">Novo</a>

    <br><br>

    <table border="1">
        <thead>
            <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Código SKU</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($produtos as $produto)
                <tr>
                    <td><a href="{{ route('produtos.show', $produto->id) }}">{{ $produto->titulo }}</a></td>
                    <td>{{ $produto->preco }}</td>
                    <td>{{ $produto->estoque }}</td>
                    <td>{{ $produto->codigo_sku }}</td>
                    <td>
                        <a href="{{ route('produtos.edit', $produto->id) }}">
                            <button>Editar</button>
                        </a>
                        <form action="{{ route('produtos.destroy', $produto->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline">
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
