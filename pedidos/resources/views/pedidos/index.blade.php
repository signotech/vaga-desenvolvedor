@extends('layouts.app')
@section('titulo', 'Pedidos')

@section('conteudo')
    <div class="topo">
        <h1>Pedidos</h1>
        <a class="btn blue-grey darken-3" href="{{ route('pedidos.create') }}">Novo pedido</a>
    </div>
    <div class="card">
        <div class="card-content">
            @include('partials.barra', ['rota' => 'pedidos.destroy-many', 'itens' => $pedidos])
            <form method="GET" id="filtro"></form>
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th><label><input type="checkbox" onclick="document.querySelectorAll('input[form=massa]').forEach(c => c.checked = this.checked)"><span></span></label></th>
                        @include('partials.th', ['campo' => 'id', 'rotulo' => 'Código'])
                        @include('partials.th', ['campo' => 'cliente', 'rotulo' => 'Cliente'])
                        @include('partials.th', ['campo' => 'data_pedido', 'rotulo' => 'Data'])
                        @include('partials.th', ['campo' => 'status', 'rotulo' => 'Status'])
                        <th>Desconto</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                    <tr class="filtros">
                        <th></th>
                        <th><input form="filtro" name="id" value="{{ request('id') }}" placeholder="Filtrar"></th>
                        <th><input form="filtro" name="cliente" value="{{ request('cliente') }}" placeholder="Filtrar"></th>
                        <th><input form="filtro" type="date" name="data_pedido" value="{{ request('data_pedido') }}"></th>
                        <th>
                            <select form="filtro" name="status" class="browser-default">
                                <option value="">Todos</option>
                                @foreach (App\Models\Pedido::STATUS as $status)
                                    <option value="{{ $status }}" @selected(request('status') === $status)>{{ $status }}</option>
                                @endforeach
                            </select>
                        </th>
                        <th></th>
                        <th></th>
                        <th class="acoes">
                            <button form="filtro" class="btn-small blue-grey darken-3">Filtrar</button>
                            <a class="btn-small grey" href="{{ route('pedidos.index') }}">Limpar</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($pedidos as $pedido)
                        <tr>
                            <td><label><input type="checkbox" form="massa" name="ids[]" value="{{ $pedido->id }}"><span></span></label></td>
                            <td><a href="{{ route('pedidos.show', $pedido) }}">{{ $pedido->id }}</a></td>
                            <td><a href="{{ route('clientes.index', ['id' => $pedido->cliente_id]) }}">{{ $pedido->cliente }}</a></td>
                            <td>{{ $pedido->data_pedido->format('d/m/Y H:i') }}</td>
                            <td>
                                <span class="chip {{ ['Pago' => 'green lighten-4', 'Cancelado' => 'red lighten-4'][$pedido->status] ?? 'amber lighten-4' }}">{{ $pedido->status }}</span>
                            </td>
                            <td>{{ $pedido->desconto > 0 ? number_format($pedido->desconto, 2, ',', '.') . '%' : '-' }}</td>
                            <td>R$ {{ number_format($pedido->total, 2, ',', '.') }}</td>
                            <td class="acoes">
                                <a class="btn-small blue-grey darken-3" href="{{ route('pedidos.show', $pedido) }}">Ver</a>
                                <a class="btn-small grey" href="{{ route('pedidos.edit', $pedido) }}">Editar</a>
                                @include('partials.excluir', ['url' => route('pedidos.destroy', $pedido)])
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">Nenhum pedido encontrado.</td></tr>
                    @endforelse
                </tbody>
            </table>
            {{ $pedidos->links() }}
        </div>
    </div>
@endsection
