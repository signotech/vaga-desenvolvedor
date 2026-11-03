{{-- Essa tela tem o formulário para cadastrar um produto. --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Produto - Signotech</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 40px;
        }

        .container {
            max-width: 650px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
        }

        h1 { margin-top: 0; }

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

        input, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        textarea { min-height: 100px; }

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

        button { background: #2563eb; color: white; }
        .back { background: #e5e7eb; color: #222; }
        .error { color: #dc2626; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Novo Produto</h1>

        <nav>
            <a href="{{ route('customers.index') }}">Clientes</a>
            <a href="{{ route('products.index') }}" class="active">Produtos</a>
            <a href="{{ route('orders.index') }}">Pedidos</a>
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

        <form action="{{ route('products.store') }}" method="POST">
            @csrf

            <label for="name">Nome do produto</label>
            <input
                type="text"
                id="name"
                name="name"
                value="{{ old('name') }}"
                required
            >

            <label for="description">Descrição</label>
            <textarea
                id="description"
                name="description"
            >{{ old('description') }}</textarea>

            <label for="price">Preço (R$)</label>
            <input
                type="number"
                id="price"
                name="price"
                value="{{ old('price') }}"
                min="0.01"
                step="0.01"
                required
            >

            <button type="submit">Salvar Produto</button>
            <a href="{{ route('products.index') }}" class="back">Voltar</a>
        </form>
    </div>
</body>
</html>
