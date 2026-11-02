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
            <div class="tabela"><table class="striped">
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
                        @foreach (['id' => 'Código', 'nome' => 'Nome', 'cpf' => 'CPF', 'email' => 'E-mail'] as $campo => $rotulo)
                            <th><input form="filtro" name="{{ $campo }}" value="{{ request($campo) }}" placeholder="{{ $rotulo }}"></th>
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
                            <td data-label="Selecionar"><label><input type="checkbox" form="massa" name="ids[]" value="{{ $cliente->id }}"><span></span></label></td>
                            <td data-label="Código">{{ $cliente->id }}</td>
                            <td data-label="Nome">{{ $cliente->nome }}</td>
                            <td data-label="CPF">{{ $cliente->cpf }}</td>
                            <td data-label="E-mail">{{ $cliente->email }}</td>
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
            </table></div>
            {{ $clientes->links() }}
        </div>
    </div>
@endsection
