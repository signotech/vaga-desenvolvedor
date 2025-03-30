@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Clientes</h3>

        @if (session('sucesso'))
            <div class="alert alert-success">
                {{ session('sucesso') }}
            </div>
        @endif

        <!-- Botão Novo Cliente -->
        <a href="{{ route('clientes.create') }}" class="btn btn-primary mb-3">Novo Cliente</a>

        <!-- Filtro de Clientes -->
        <form method="GET" action="{{ route('clientes.index') }}" class="mb-4">
            <div class="row">
                <div class="col-md-3">
                    <label for="id" class="form-label">Filtrar por Código:</label>
                    <input type="text" name="id" value="{{ request()->input('id') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="nome" class="form-label">Filtrar por Nome:</label>
                    <input type="text" name="nome" value="{{ request()->input('nome') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="email" class="form-label">Filtrar por E-mail:</label>
                    <input type="text" name="email" value="{{ request()->input('email') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="cpf" class="form-label">Filtrar por CPF:</label>
                    <input type="text" name="cpf" value="{{ request()->input('cpf') }}" class="form-control"/>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-3">
                    <label for="ordem_por" class="form-label">Ordenar por:</label>
                    <select name="ordem_por" class="form-select">
                        <option value="id" {{ request()->input('ordem_por') == 'id' ? 'selected' : '' }}>Código</option>
                        <option value="nome" {{ request()->input('ordem_por') == 'nome' ? 'selected' : '' }}>Nome</option>
                        <option value="email" {{ request()->input('ordem_por') == 'email' ? 'selected' : '' }}>E-mail</option>
                        <option value="cpf" {{ request()->input('ordem_por') == 'cpf' ? 'selected' : '' }}>CPF</option>
                    </select>
                </div>

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
            </div>

            <div class="row mt-3">
                <div class="col-md-3 d-flex align-items-end">
                    <button type="button" onclick="window.location='{{ route('clientes.index') }}'" class="btn btn-secondary w-100">
                        Resetar Filtros
                    </button>
                </div>
            </div>
        </form>

        <!-- Tabela de Clientes -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-light">
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
                                <a href="{{ route('clientes.show', $cliente->id) }}" class="btn btn-info btn-sm">Visualizar</a>
                                <a href="{{ route('clientes.edit', $cliente->id) }}" class="btn btn-warning btn-sm">Editar</a>
                                <form action="{{ route('clientes.destroy', $cliente->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline">
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
            {{ $clientes->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
        </div>
    </div>

@endsection
