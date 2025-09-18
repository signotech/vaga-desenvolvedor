@extends('layouts.app')
@section('content')
<h1>Clientes</h1>
<a href="{{ route('clientes.create') }}">Novo Cliente</a>

@if(session('success'))
<div style="color:green;">{{ session('success') }}</div>
@endif

<form method="GET" style="margin-top:10px;margin-bottom:10px;">
    <input type="text" name="search" placeholder="Pesquisar..." value="{{ request('search') }}">

    <label>Itens por página:</label>
    <select name="per_page" onchange="this.form.submit()">
        <option value="10" {{ request('per_page')==10?'selected':'' }}>10</option>
        <option value="20" {{ request('per_page')==20?'selected':'' }}>20</option>
        <option value="50" {{ request('per_page')==50?'selected':'' }}>50</option>
    </select>

    <button type="submit">Filtrar</button>
</form>

<table border="1" cellpadding="5">
    <tr>
        <th><a href="?sort_by=id&sort_order={{ request('sort_order') === 'asc' ? 'desc' : 'asc' }}">ID</a></th>
        <th><a href="?sort_by=nome&sort_order={{ request('sort_order') === 'asc' ? 'desc' : 'asc' }}">Nome</a></th>
        <th><a href="?sort_by=email&sort_order={{ request('sort_order') === 'asc' ? 'desc' : 'asc' }}">Email</a></th>
        <th><a href="?sort_by=cpf&sort_order={{ request('sort_order') === 'asc' ? 'desc' : 'asc' }}">CPF</a></th>
        <th><a href="?sort_by=telefone&sort_order={{ request('sort_order') === 'asc' ? 'desc' : 'asc' }}">Telefone</a></th>
        <th>Ações</th>
    </tr>
    @foreach($clientes as $cliente)
    <tr>
        <td>{{ $cliente->id }}</td>
        <td>{{ $cliente->nome }}</td>
        <td>{{ $cliente->email }}</td>
        <td>{{ $cliente->cpf }}</td>
        <td>{{ $cliente->telefone }}</td>
        <td>
            <a href="{{ route('clientes.edit', $cliente) }}">Editar</a>
            <form action="{{ route('clientes.destroy', $cliente) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('Tem certeza?')">Excluir</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>

<div class="pagination">
    @for ($i = 1; $i <= $clientes->lastPage(); $i++)
        <a href="{{ $clientes->url($i) }}"
            style="margin:0 5px; font-size:0.875rem; text-decoration:none;">
            {{ $i }}
        </a>
        @endfor
</div>
@endsection