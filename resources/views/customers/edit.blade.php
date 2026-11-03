{{-- Aqui mostramos os dados do cliente para que possam ser alterados. --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Cliente - Signotech</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            padding: 30px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 8px;
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
            margin-top: 15px;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            box-sizing: border-box;
        }

        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 15px;
            margin-top: 20px;
            cursor: pointer;
            border-radius: 5px;
        }

        .back {
            color: #2563eb;
            text-decoration: none;
        }

        .error {
            color: red;
        }
    </style>
</head>
<body>
    <div class="container">

        <h1>Editar Cliente</h1>

        <nav>
            <a href="{{ route('customers.index') }}" class="active">Clientes</a>
            <a href="{{ route('products.index') }}">Produtos</a>
            <a href="{{ route('orders.index') }}">Pedidos</a>
        </nav>

        <a href="{{ route('customers.index') }}" class="back">
            ← Voltar para clientes
        </a>

        @if ($errors->any())
            <div class="error">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('customers.update', $cliente->id) }}" method="POST">
            @csrf
            @method('PUT')

            <label for="name">Nome completo</label>
            <input
                type="text"
                id="name"
                name="name"
                value="{{ old('name', $cliente->name) }}"
                required
            >

            <label for="email">E-mail</label>
            <input
                type="email"
                id="email"
                name="email"
                value="{{ old('email', $cliente->email) }}"
                required
            >

            <label for="phone">Telefone</label>
            <input
                type="text"
                id="phone"
                name="phone"
                value="{{ old('phone', $cliente->phone) }}"
            >

            <button type="submit">Atualizar Cliente</button>

        </form>
    </div>
</body>
</html>
