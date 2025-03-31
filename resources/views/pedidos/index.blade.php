@extends('layouts.main')

@section('content')
    
    <div class="container mt-5">
        <h3 class="text-center mb-4">Pedidos</h3>

        @if (session('sucesso'))
            <div class="alert alert-success">
                {{ session('sucesso') }}
            </div>
        @endif

        <!-- Botão Novo Pedido -->
        <a href="{{ route('pedidos.create') }}" class="btn btn-primary mb-3">Novo Pedido</a>

        <!-- Filtro de Pedidos -->
        <form method="GET" action="{{ route('pedidos.index') }}" class="mb-4">
            <div class="row">
                <div class="col-md-3">
                    <label for="id" class="form-label">Filtrar por Código:</label>
                    <input type="text" name="id" value="{{ request()->input('id') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="cliente_id" class="form-label">Filtrar por Cliente:</label>
                    <select name="cliente_id" class="form-select">
                        <option value="">Todos</option>
                        @foreach ($clientes as $cliente)
                            <option value="{{ $cliente->id }}" {{ request()->input('cliente_id') == $cliente->id ? 'selected' : '' }}>
                                {{ $cliente->id }} - {{ $cliente->nome }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-3">
                    <label for="valor" class="form-label">Filtrar por Valor:</label>
                    <input type="number" name="valor" step="0.01" value="{{ request()->input('valor') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="status" class="form-label">Filtrar por Status:</label>
                    <select name="status" class="form-select">
                        <option value="">Todos</option>
                        <option value="Em Aberto" {{ request()->input('status') == 'Em Aberto' ? 'selected' : '' }}>Em Aberto</option>
                        <option value="Pago" {{ request()->input('status') == 'Pago' ? 'selected' : '' }}>Pago</option>
                        <option value="Cancelado" {{ request()->input('status') == 'Cancelado' ? 'selected' : '' }}>Cancelado</option>
                    </select>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-3">
                    <label for="data_minima" class="form-label">Filtrar por Data Mínima:</label>
                    <input type="date" name="data_minima" value="{{ request()->input('data_minima') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="data_maxima" class="form-label">Filtrar por Data Máxima:</label>
                    <input type="date" name="data_maxima" value="{{ request()->input('data_maxima') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="produto" class="form-label">Filtrar por Produto:</label>
                    <select name="produto_id" class="form-select">
                        <option value="">Todos</option>
                        @foreach ($produtos as $produto)
                            <option value="{{ $produto->id }}" {{ request()->input('produto_id') == $produto->id ? 'selected' : '' }}>
                                {{ $produto->id }} - {{ $produto->titulo }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-3">
                    <label for="ordem_por" class="form-label">Ordenar por:</label>
                    <select name="ordem_por" class="form-select">
                        <option value="id" {{ request()->input('ordem_por') == 'id' ? 'selected' : '' }}>Código</option>
                        <option value="cliente" {{ request()->input('ordem_por') == 'cliente' ? 'selected' : '' }}>Cliente</option>
                        <option value="status" {{ request()->input('ordem_por') == 'status' ? 'selected' : '' }}>Status</option>
                        <option value="created_at" {{ request()->input('ordem_por') == 'created_at' ? 'selected' : '' }}>Data</option>
                    </select>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-3">
                    <label for="ordem" class="form-label">Ordem:</label>
                    <select name="ordem" class="form-select">
                        <option value="asc" {{ request()->input('ordem') == 'asc' ? 'selected' : '' }}>Crescente</option>
                        <option value="desc" {{ request()->input('ordem') == 'desc' ? 'selected' : '' }}>Decrescente</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <label for="itens_por_pagina" class="form-label">Itens por página:</label>
                    <select name="itens_por_pagina" id="itens_por_pagina" class="form-select">
                        <option value="10" {{ request()->input('itens_por_pagina') == '10' ? 'selected' : '' }}>10</option>
                        <option value="20" {{ request()->input('itens_por_pagina') == '20' || !request()->has('itens_por_pagina') ? 'selected' : '' }}>20</option>
                        <option value="50" {{ request()->input('itens_por_pagina') == '50' ? 'selected' : '' }}>50</option>
                        <option value="100" {{ request()->input('itens_por_pagina') == '100' ? 'selected' : '' }}>100</option>
                    </select>
                </div>

                <div class="col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-success w-100">Filtrar</button>
                </div>
    
                <div class="col-md-3 d-flex align-items-end">
                    <button type="button" onclick="window.location='{{ route('pedidos.index') }}'" class="btn btn-secondary w-100">
                        Resetar Filtros
                    </button>
                </div>
            </div>
        </form>

        <!-- Tabela de Pedidos -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-light">
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th style="text-align: center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($pedidos as $pedido)
                        <tr>
                            <td>{{ $pedido->id }}</td>
                            <td><a href="{{ route('clientes.show', $pedido->cliente->id) }}">{{ $pedido->cliente->nome }}</a></td>
                            <td>R$ {{ number_format($pedido->valor_total, 2, ',', '.') }}</td>
                            <td class="text-center 
                                @if($pedido->status == 'Cancelado') text-danger 
                                @elseif($pedido->status == 'Em Aberto') text-warning 
                                @elseif($pedido->status == 'Pago') text-success 
                                @endif">
                                {{ $pedido->status }}
                            </td>
                            <td>{{ $pedido->created_at->format('d/m/Y') }}</td>
                            <td style="text-align: center">
                                <a href="{{ route('pedidos.show', $pedido->id) }}" class="btn btn-info btn-sm">Visualizar</a>
                                <a href="{{ route('pedidos.edit', $pedido->id) }}" class="btn btn-warning btn-sm">Editar</a>
                                <form action="{{ route('pedidos.destroy', $pedido->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm">Excluir</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Paginação -->
        <div class="d-flex justify-content-center mt-4">
            {{ $pedidos->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
        </div>
    </div>

@endsection
