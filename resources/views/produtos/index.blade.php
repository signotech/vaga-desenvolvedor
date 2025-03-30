@extends('layouts.main')

@section('content')
    
    <h3>Produtos</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('produtos.create') }}">Novo</a>

    <br><br>

    <form method="GET" action="{{ route('produtos.index') }}">
        <label for="id">Filtrar por Código:</label>
        <input type="text" name="id" value="{{ request()->input('id') }}"/>
        <br>

        <label for="titulo">Filtrar por Título:</label>
        <input type="text" name="titulo" value="{{ request()->input('titulo') }}"/>
        <br>

        <label for="preco">Filtrar por Preço:</label>
        <input type="number" name="preco" step="0.01" value="{{ request()->input('preco') }}"/>
        <br>

        <label for="estoque">Filtrar por Estoque:</label>
        <input type="number" name="estoque" value="{{ request()->input('estoque') }}"/>
        <br>

        <label for="codigo_sku">Filtrar por Código SKU:</label>
        <input type="text" name="codigo_sku" value="{{ request()->input('codigo_sku') }}"/>
        <br>

        <label for="ordem_por">Ordenar por:</label>
        <select name="ordem_por">
            <option value="id" {{ request()->input('ordem_por') == 'id' ? 'selected' : '' }}>Código</option>
            <option value="titulo" {{ request()->input('ordem_por') == 'titulo' ? 'selected' : '' }}>Título</option>
            <option value="preco" {{ request()->input('ordem_por') == 'preco' ? 'selected' : '' }}>Preço</option>
            <option value="estoque" {{ request()->input('ordem_por') == 'estoque' ? 'selected' : '' }}>Estoque</option>
            <option value="codigo_sku" {{ request()->input('ordem_por') == 'codigo_sku' ? 'selected' : '' }}>Código SKU</option>
        </select>

        <label for="ordem">Ordem:</label>
        <select name="ordem">
            <option value="asc" {{ request()->input('ordem') == 'asc' ? 'selected' : '' }}>Crescente</option>
            <option value="desc" {{ request()->input('ordem') == 'desc' ? 'selected' : '' }}>Decrescente</option>
        </select>

        <button type="submit">Filtrar</button>

        <button type="button" onclick="window.location='{{ route('produtos.index') }}'">
            Resetar Filtros
        </button>
    </form>

    <br><br>

    <table border="1">
        <thead>
            <tr>
                <th>Código</th>
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
                    <td>{{ $produto->id }}</td>
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

    <div>
        {{ $produtos->links('pagination::bootstrap-4') }}
    </div>

@endsection
