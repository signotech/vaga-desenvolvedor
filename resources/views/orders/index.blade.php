{{-- Essa tela mostra os pedidos cadastrados e os principais dados de cada um. --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedidos - Signotech</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 30px;
        }
        .container {
            max-width: 1100px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
        }
        h1 { margin-top: 0; }
        .button {
            display: inline-block;
            padding: 10px 15px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .success { color: #15803d; margin: 15px 0; }
        .error { color: #dc2626; margin: 15px 0; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }
        th { background: #f1f5f9; }
        .action {
            display: inline-block;
            padding: 7px 10px;
            border-radius: 4px;
            text-decoration: none;
            color: white;
            margin-right: 4px;
        }
        .edit { background: #2563eb; }
        .delete { background: #dc2626; border: none; cursor: pointer; }
        .empty { text-align: center; padding: 25px; color: #666; }
        nav { margin-bottom: 20px; }
        nav a { margin-right: 15px; color: #2563eb; }
    </style>
</head>
<body>
<div class="container">
    <h1>Pedidos</h1>

    <nav>
        <a href="{{ route('customers.index') }}">Clientes</a>
        <a href="{{ route('products.index') }}">Produtos</a>
        <a href="{{ route('orders.index') }}">Pedidos</a>
    </nav>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    @if (session('error'))
        <div class="error">{{ session('error') }}</div>
    @endif

    <a href="{{ route('orders.create') }}" class="button">+ Novo Pedido</a>

    <form action="{{ route('orders.index') }}" method="GET"
          style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">

        <select name="filter" style="width: auto;">
            <option value="id" {{ request('filter') == 'id' ? 'selected' : '' }}>ID</option>
            <option value="customer_id" {{ request('filter') == 'customer_id' ? 'selected' : '' }}>ID do Cliente</option>
            <option value="product_id" {{ request('filter') == 'product_id' ? 'selected' : '' }}>ID do Produto</option>
            <option value="status" {{ request('filter') == 'status' ? 'selected' : '' }}>Status</option>
        </select>

        <input type="text" name="search"
               value="{{ request('search') }}"
               placeholder="Pesquisar..."
               style="width: 200px;">

        <select name="sort" style="width: auto;">
            <option value="id" {{ request('sort', 'id') == 'id' ? 'selected' : '' }}>ID</option>
            <option value="customer_id" {{ request('sort') == 'customer_id' ? 'selected' : '' }}>Cliente</option>
            <option value="status" {{ request('sort') == 'status' ? 'selected' : '' }}>Status</option>
            <option value="created_at" {{ request('sort') == 'created_at' ? 'selected' : '' }}>Data</option>
        </select>

        <select name="direction" style="width: auto;">
            <option value="desc" {{ request('direction', 'desc') == 'desc' ? 'selected' : '' }}>Decrescente</option>
            <option value="asc" {{ request('direction') == 'asc' ? 'selected' : '' }}>Crescente</option>
        </select>

        <button type="submit" class="button">Filtrar</button>

        <a href="{{ route('orders.index') }}">Limpar filtros</a>
    </form>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Valor Total</th>
                <th>Data</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($pedidos as $pedido)
                <tr>
                    <td>{{ $pedido->id }}</td>
                    <td>
                        <a href="{{ route('customers.edit', $pedido->customer->id) }}">
                            {{ $pedido->customer->name }}
                        </a>
                    </td>
                    <td>
                        @if ($pedido->status === 'open')
                            Em Aberto
                        @elseif ($pedido->status === 'paid')
                            Pago
                        @else
                            Cancelado
                        @endif
                    </td>
                    <td>
                        @php
                            // Somamos o valor de cada produto que faz parte do pedido.
                            $valorTotal = 0;
                        @endphp

                        @foreach ($pedido->orderItems as $itemPedido)
                            @php
                                $valorTotal = $valorTotal + ($itemPedido->quantity * $itemPedido->unit_price);
                            @endphp
                        @endforeach

                        R$ {{ number_format($valorTotal, 2, ',', '.') }}
                    </td>
                    <td>{{ $pedido->created_at->format('d/m/Y') }}</td>
                    <td>
                        <a href="{{ route('orders.edit', $pedido->id) }}" class="action edit">
                            Editar
                        </a>

                        <form action="{{ route('orders.destroy', $pedido->id) }}"
                              method="POST"
                              style="display:inline"
                              onsubmit="return confirm('Deseja realmente excluir este pedido?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="action delete">Excluir</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="empty">
                        Nenhum pedido cadastrado.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 20px;">
        {{ $pedidos->links() }}
    </div>
</div>
</body>
</html>
