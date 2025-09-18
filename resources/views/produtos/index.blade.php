@extends('layouts.app')

@section('content')
<h1>Produtos</h1>
<a href="{{ route('produtos.create') }}" class="btn btn-primary">Novo Produto</a>

{{-- Filtro --}}
<form id="filtro-form" method="GET" style="margin: 15px 0;">
    <input type="text" name="search" id="search" placeholder="Pesquisar..." value="{{ request('search') }}">
    <label>Itens por página:</label>
    <select name="per_page" id="per_page">
        <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
        <option value="20" {{ request('per_page') == 20 ? 'selected' : '' }}>20</option>
        <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50</option>
    </select>
    <button type="button" id="btn-filtrar">Filtrar</button>
</form>

{{-- Tabela --}}
<table border="1" id="tabela-produtos">
    <thead>
        <tr>
            <th data-sort="id">ID</th>
            <th data-sort="titulo">Título</th>
            <th data-sort="preco">Preço</th>
            <th>Descrição</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {{-- Conteúdo preenchido via AJAX --}}
    </tbody>
</table>

<div id="paginacao" style="margin-top: 10px;"></div>
@endsection

@section('scripts')
<script src="{{ asset('js/produtos_index.js') }}"></script>
@endsection