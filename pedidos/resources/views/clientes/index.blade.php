@extends('layouts.app')
@section('titulo', 'Clientes')

@section('conteudo')
    <div class="topo">
        <h1>Clientes</h1>
        <a class="btn" href="{{ route('clientes.create') }}">Novo cliente</a>
    </div>
    <div class="card">
        <form method="GET" id="filtro" class="filtros"></form>
        <table>
            <thead>
                <tr>
                    @include('partials.th', ['campo' => 'id', 'rotulo' => 'Código'])
                    @include('partials.th', ['campo' => 'nome', 'rotulo' => 'Nome'])
                    @include('partials.th', ['campo' => 'cpf', 'rotulo' => 'CPF'])
                    @include('partials.th', ['campo' => 'email', 'rotulo' => 'E-mail'])
                    <th>Ações</th>
                </tr>
                <tr class="filtros">
                    @foreach (['id', 'nome', 'cpf', 'email'] as $campo)
                        <th><input form="filtro" name="{{ $campo }}" value="{{ request($campo) }}" placeholder="Filtrar"></th>
                    @endforeach
                    <th class="acoes">
                        <button form="filtro" class="btn peq">Filtrar</button>
                        <a class="btn peq sec" href="{{ route('clientes.index') }}">Limpar</a>
                    </th>
                </tr>
            </thead>
            <tbody>
                @forelse ($clientes as $cliente)
                    <tr>
                        <td>{{ $cliente->id }}</td>
                        <td>{{ $cliente->nome }}</td>
                        <td>{{ $cliente->cpf }}</td>
                        <td>{{ $cliente->email }}</td>
                        <td class="acoes">
                            <a class="btn peq" href="{{ route('pedidos.index', ['cliente' => $cliente->nome]) }}">Pedidos</a>
                            <a class="btn peq sec" href="{{ route('clientes.edit', $cliente) }}">Editar</a>
                            @include('partials.excluir', ['url' => route('clientes.destroy', $cliente)])
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5">Nenhum cliente encontrado.</td></tr>
                @endforelse
            </tbody>
        </table>
        {{ $clientes->links() }}
    </div>
@endsection
