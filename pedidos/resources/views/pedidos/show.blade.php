@extends('layouts.app')
@section('titulo', 'Pedido ' . $pedido->id)

@section('conteudo')
    <div class="topo">
        <h1>Pedido #{{ $pedido->id }}</h1>
        <a class="btn sec" href="{{ route('pedidos.edit', $pedido) }}">Editar</a>
    </div>
    <div class="card">
        <p>
            <strong>Cliente:</strong>
            <a href="{{ route('clientes.index', ['id' => $pedido->cliente_id]) }}">{{ $pedido->cliente->nome }}</a><br>
            <strong>Data:</strong> {{ $pedido->data_pedido->format('d/m/Y H:i') }}<br>
            <strong>Status:</strong> {{ $pedido->status }}<br>
            <strong>Desconto:</strong> {{ number_format($pedido->desconto, 2, ',', '.') }}%
        </p>
        <table>
            <thead>
                <tr><th>SKU</th><th>Produto</th><th>Qtd</th><th>Preço unit.</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
                @foreach ($pedido->itens as $item)
                    <tr>
                        <td>{{ $item->produto->sku }}</td>
                        <td><a href="{{ route('produtos.index', ['id' => $item->produto_id]) }}">{{ $item->produto->titulo }}</a></td>
                        <td>{{ $item->quantidade }}</td>
                        <td>R$ {{ number_format($item->preco_unitario, 2, ',', '.') }}</td>
                        <td>R$ {{ number_format($item->quantidade * $item->preco_unitario, 2, ',', '.') }}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr><th colspan="4">Subtotal</th><th>R$ {{ number_format($pedido->subtotal, 2, ',', '.') }}</th></tr>
                <tr><th colspan="4">Total com desconto</th><th>R$ {{ number_format($pedido->total, 2, ',', '.') }}</th></tr>
            </tfoot>
        </table>
        <p><a class="btn sec" href="{{ route('pedidos.index') }}">Voltar</a></p>
    </div>
@endsection
