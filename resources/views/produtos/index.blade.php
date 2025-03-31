@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Produtos</h3>

        @if (session('sucesso'))
            <div class="alert alert-success">
                {{ session('sucesso') }}
            </div>
        @endif

        <!-- Botão Novo Produto -->
        <a href="{{ route('produtos.create') }}" class="btn btn-primary mb-3">Novo Produto</a>

        <!-- Filtro de Produtos -->
        <form method="GET" action="{{ route('produtos.index') }}" class="mb-4">
            <div class="row">
                <div class="col-md-3">
                    <label for="id" class="form-label">Filtrar por Código:</label>
                    <input type="text" name="id" value="{{ request()->input('id') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="titulo" class="form-label">Filtrar por Título:</label>
                    <input type="text" name="titulo" value="{{ request()->input('titulo') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="preco_minimo" class="form-label">Filtrar por Preço mínimo:</label>
                    <input type="number" name="preco_minimo" step="0.01" value="{{ request()->input('preco_minimo') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="preco_maximo" class="form-label">Filtrar por Preço máximo:</label>
                    <input type="number" name="preco_maximo" step="0.01" value="{{ request()->input('preco_maximo') }}" class="form-control"/>
                </div>
            </div>
            
            <div class="row mt-3">
                <div class="col-md-3">
                    <label for="estoque" class="form-label">Filtrar por Estoque:</label>
                    <input type="number" name="estoque" value="{{ request()->input('estoque') }}" class="form-control"/>
                </div>
                
                <div class="col-md-3">
                    <label for="codigo_sku" class="form-label">Filtrar por Código SKU:</label>
                    <input type="text" name="codigo_sku" value="{{ request()->input('codigo_sku') }}" class="form-control"/>
                </div>

                <div class="col-md-3">
                    <label for="ordem_por" class="form-label">Ordenar por:</label>
                    <select name="ordem_por" class="form-select">
                        <option value="id" {{ request()->input('ordem_por') == 'id' ? 'selected' : '' }}>Código</option>
                        <option value="titulo" {{ request()->input('ordem_por') == 'titulo' ? 'selected' : '' }}>Título</option>
                        <option value="preco" {{ request()->input('ordem_por') == 'preco' ? 'selected' : '' }}>Preço</option>
                        <option value="estoque" {{ request()->input('ordem_por') == 'estoque' ? 'selected' : '' }}>Estoque</option>
                        <option value="codigo_sku" {{ request()->input('ordem_por') == 'codigo_sku' ? 'selected' : '' }}>Código SKU</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <label for="ordem" class="form-label">Ordem:</label>
                    <select name="ordem" class="form-select">
                        <option value="asc" {{ request()->input('ordem') == 'asc' ? 'selected' : '' }}>Crescente</option>
                        <option value="desc" {{ request()->input('ordem') == 'desc' ? 'selected' : '' }}>Decrescente</option>
                    </select>
                </div>
            </div>
            
            <div class="row mt-3">
                <div class="col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-success w-100">Filtrar</button>
                </div>

                <div class="col-md-3 d-flex align-items-end">
                    <button type="button" onclick="window.location='{{ route('produtos.index') }}'" class="btn btn-secondary w-100">
                        Resetar Filtros
                    </button>
                </div>
            </div>
        </form>

        <!-- Tabela de Produtos -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-light">
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Código SKU</th>
                        <th style="text-align: center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($produtos as $produto)
                        <tr>
                            <td>{{ $produto->id }}</td>
                            <td>{{ $produto->titulo }}</td>
                            <td>R$ {{ number_format($produto->preco, 2, ',', '.') }}</td>
                            <td>{{ $produto->estoque }}</td>
                            <td>{{ $produto->codigo_sku }}</td>
                            <td style="text-align: center">
                                <a href="{{ route('produtos.show', $produto->id) }}" class="btn btn-info btn-sm">Visualizar</a>
                                <a href="{{ route('produtos.edit', $produto->id) }}" class="btn btn-warning btn-sm">Editar</a>
                                <form action="{{ route('produtos.destroy', $produto->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline">
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
            {{ $produtos->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
        </div>
    </div>

@endsection
