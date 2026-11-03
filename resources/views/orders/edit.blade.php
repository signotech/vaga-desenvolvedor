{{-- Aqui carregamos os dados do pedido para permitir as alterações. --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Pedido - Signotech</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 30px;
        }

        .container {
            max-width: 750px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
        }

        nav {
            margin-bottom: 20px;
        }

        nav a {
            margin-right: 15px;
            color: #2563eb;
            text-decoration: none;
        }

        nav a:hover {
            text-decoration: underline;
        }

        nav a.active {
            font-weight: bold;
        }

        label {
            display: block;
            margin-top: 18px;
            font-weight: bold;
        }

        select, input {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        .product-row {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 15px;
            margin-top: 12px;
        }

        button, .back {
            display: inline-block;
            margin-top: 22px;
            padding: 11px 18px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
            font-size: 15px;
        }

        .save { background: #2563eb; color: white; }
        .add { background: #15803d; color: white; }
        .remove { background: #dc2626; color: white; margin-top: 6px; }
        .back { background: #e5e7eb; color: #222; }
        .error { color: #dc2626; margin-top: 12px; }
    </style>
</head>
<body>
<div class="container">
    <h1>Editar Pedido #{{ $pedido->id }}</h1>

    <nav>
        <a href="{{ route('customers.index') }}">Clientes</a>
        <a href="{{ route('products.index') }}">Produtos</a>
        <a href="{{ route('orders.index') }}" class="active">Pedidos</a>
    </nav>

    @if ($errors->any())
        <div class="error">
            <strong>Verifique os campos:</strong>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('orders.update', $pedido->id) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="customer_id">Cliente</label>
        <select name="customer_id" id="customer_id" required>
            @foreach ($clientes as $cliente)
                <option value="{{ $cliente->id }}"
                    {{ old('customer_id', $pedido->customer_id) == $cliente->id ? 'selected' : '' }}>
                    {{ $cliente->name }}
                </option>
            @endforeach
        </select>

        <label for="status">Status do pedido</label>
        <select name="status" id="status" required>
            <option value="open" {{ old('status', $pedido->status) == 'open' ? 'selected' : '' }}>
                Em Aberto
            </option>
            <option value="paid" {{ old('status', $pedido->status) == 'paid' ? 'selected' : '' }}>
                Pago
            </option>
            <option value="cancelled" {{ old('status', $pedido->status) == 'cancelled' ? 'selected' : '' }}>
                Cancelado
            </option>
        </select>

        <h3>Produtos do pedido</h3>

        <div id="products">
            @foreach ($pedido->orderItems as $indice => $itemPedido)
                <div class="product-row">
                    <div>
                        <select name="products[{{ $indice }}][product_id]" required>
                            @foreach ($produtos as $produto)
                                <option value="{{ $produto->id }}"
                                    {{ old("products.$indice.product_id", $itemPedido->product_id) == $produto->id ? 'selected' : '' }}>
                                    {{ $produto->name }} - R$ {{ number_format($produto->price, 2, ',', '.') }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <input
                            type="number"
                            name="products[{{ $indice }}][quantity]"
                            min="1"
                            value="{{ old("products.$indice.quantity", $itemPedido->quantity) }}"
                            required
                        >
                    </div>
                </div>
            @endforeach
        </div>

        <button type="button" class="add" onclick="addProduct()">
            + Adicionar outro produto
        </button>

        <br>

        <button type="submit" class="save">Salvar Alterações</button>
        <a href="{{ route('orders.index') }}" class="back">Voltar</a>
    </form>
</div>

<script>
    let indiceProduto = {{ $pedido->orderItems->count() }};

    function addProduct() {
        const container = document.getElementById('products');
        const row = document.createElement('div');

        row.className = 'product-row';

        row.innerHTML = `
            <div>
                <select name="products[${indiceProduto}][product_id]" required>
                    <option value="">Selecione um produto</option>
                    @foreach ($produtos as $produto)
                        <option value="{{ $produto->id }}">
                            {{ $produto->name }} - R$ {{ number_format($produto->price, 2, ',', '.') }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <input
                    type="number"
                    name="products[${indiceProduto}][quantity]"
                    min="1"
                    value="1"
                    required
                >
            </div>
        `;

        container.appendChild(row);
        indiceProduto++;
    }
</script>

</body>
</html>