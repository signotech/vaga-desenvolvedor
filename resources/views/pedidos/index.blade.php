@extends('layouts.main')

@section('content')
    
    <h3>Pedidos</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('pedidos.create') }}">Novo</a>

    <br><br>

    <form method="GET" action="{{ route('pedidos.index') }}">
        <label for="id">Filtrar por Código:</label>
        <input type="text" name="id" value="{{ request()->input('id') }}"/>
        <br>

        <label for="cliente_id">Filtrar por Cliente:</label>
        <select name="cliente_id">
            <option value="">Todos</option>
            @foreach ($clientes as $cliente)
                <option value="{{ $cliente->id }}" {{ request()->input('cliente_id') == $cliente->id ? 'selected' : '' }}>
                    {{ $cliente->nome }} - Id: {{ $cliente->id }}
                </option>
            @endforeach
        </select>
        <br>

        <label for="valor">Filtrar por Valor:</label>
        <input type="number" step="0.01" name="valor" value="{{ request()->input('valor') }}">
        <br>

        <label for="status">Filtrar por Status:</label>
        <select name="status">
            <option value="">Todos</option>
            <option value="Em Aberto" {{ request()->input('status') == 'Em Aberto' ? 'selected' : '' }}>Em Aberto</option>
            <option value="Pago" {{ request()->input('status') == 'Pago' ? 'selected' : '' }}>Pago</option>
            <option value="Cancelado" {{ request()->input('status') == 'Cancelado' ? 'selected' : '' }}>Cancelado</option>
        </select>
        <br>

        <label for="data">Filtrar por Data:</label>
        <input type="date" name="data" value="{{ request()->input('data') }}">
        <br>

        <label for="produto">Filtrar por Produto:</label>
        <select name="produto_id">
            <option value="">Todos</option>
            @foreach ($produtos as $produto)
                <option value="{{ $produto->id }}" {{ request()->input('produto_id') == $produto->id ? 'selected' : '' }}>
                    {{ $produto->titulo }} - Id: {{ $produto->id }}
                </option>
            @endforeach
        </select>
        <br>

        <label for="ordem_por">Ordenar por:</label>
        <select name="ordem_por">
            <option value="id" {{ request()->input('ordem_por') == 'id' ? 'selected' : '' }}>Código</option>
            <option value="cliente" {{ request()->input('ordem_por') == 'cliente' ? 'selected' : '' }}>Cliente</option>
            <option value="status" {{ request()->input('ordem_por') == 'status' ? 'selected' : '' }}>Status</option>
            <option value="data" {{ request()->input('ordem_por') == 'data' ? 'selected' : '' }}>Data</option>
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

        <button type="button" onclick="window.location='{{ route('pedidos.index') }}'">
            Resetar Filtros
        </button>
    </form>

    <br><br>

    <table border="1">
        <thead>
            <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($pedidos as $pedido)
                <tr>
                    <td>{{ $pedido->id }}</td>
                    <td><a href="{{ route('clientes.show', $pedido->cliente->id) }}">{{ $pedido->cliente->nome }}</a></td>
                    <td>{{ $pedido->valor_total }}</td>
                    <td>{{ $pedido->status }}</td>
                    <td>{{ $pedido->created_at }}</td>
                    <td>
                        <a href="{{ route('pedidos.show', $pedido->id) }}">
                            <button>Visualizar</button>
                        </a>
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

    <div>
        {{ $pedidos->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
    </div>

@endsection
