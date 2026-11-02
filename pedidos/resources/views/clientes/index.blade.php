@extends('layouts.app')
@section('titulo', 'Clientes')

@section('conteudo')
    <div class="topo">
        <h1>Clientes</h1>
        <a class="btn blue-grey darken-3" href="{{ route('clientes.create') }}">Novo cliente</a>
    </div>
    <div class="card">
        <div class="card-content">
            @include('partials.barra', ['rota' => 'clientes.destroy-many', 'itens' => $clientes])
            <form method="GET" id="filtro"></form>
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th><label><input type="checkbox" onclick="document.querySelectorAll('input[form=massa]').forEach(c => c.checked = this.checked)"><span></span></label></th>
                        @include('partials.th', ['campo' => 'id', 'rotulo' => 'Código'])
                        @include('partials.th', ['campo' => 'nome', 'rotulo' => 'Nome'])
                        @include('partials.th', ['campo' => 'cpf', 'rotulo' => 'CPF'])
                        @include('partials.th', ['campo' => 'email', 'rotulo' => 'E-mail'])
                        <th>Ações</th>
                    </tr>
                    <tr class="filtros">
                        <th></th>
                        @foreach (['id', 'nome', 'cpf', 'email'] as $campo)
                            <th><input form="filtro" name="{{ $campo }}" value="{{ request($campo) }}" placeholder="Filtrar"></th>
                        @endforeach
                        <th class="acoes">
                            <button form="filtro" class="btn-small blue-grey darken-3">Filtrar</button>
                            <a class="btn-small grey" href="{{ route('clientes.index') }}">Limpar</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($clientes as $cliente)
                        <tr>
                            <td><label><input type="checkbox" form="massa" name="ids[]" value="{{ $cliente->id }}"><span></span></label></td>
                            <td>{{ $cliente->id }}</td>
                            <td>{{ $cliente->nome }}</td>
                            <td>{{ $cliente->cpf }}</td>
                            <td>{{ $cliente->email }}</td>
                            <td class="acoes">
                                <a class="btn-small blue-grey darken-3" href="{{ route('pedidos.index', ['cliente' => $cliente->nome]) }}">Pedidos</a>
                                <a class="btn-small grey" href="{{ route('clientes.edit', $cliente) }}">Editar</a>
                                @include('partials.excluir', ['url' => route('clientes.destroy', $cliente)])
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6">Nenhum cliente encontrado.</td></tr>
                    @endforelse
                </tbody>
            </table>
            {{ $clientes->links() }}
        </div>
    </div>
@endsection
