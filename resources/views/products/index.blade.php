{{-- Essa é a lista de produtos, com pesquisa, ordenação e ações de cadastro. --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - Signotech</title>

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
            border-radius: 8px;
        }

        h1 {
            color: #333;
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

        .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            margin-bottom: 20px;
            border: none;
            cursor: pointer;
        }

        .button:hover,
        .edit-button:hover {
            background: #1d4ed8;
        }

        .success-message {
            color: #15803d;
            background: #dcfce7;
            padding: 10px;
            border-radius: 5px;
        }

        .error-message {
            color: #b91c1c;
            background: #fee2e2;
            padding: 10px;
            border-radius: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background: #f1f5f9;
        }

        .action-button {
            display: inline-block;
            padding: 7px 12px;
            border-radius: 5px;
            text-decoration: none;
            color: white;
            font-size: 14px;
            border: none;
            cursor: pointer;
        }

        .edit-button {
            background: #2563eb;
        }

        .delete-button {
            background: #dc2626;
        }

        .delete-button:hover {
            background: #b91c1c;
        }

        .delete-form {
            display: inline;
        }

        .filter-form {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            align-items: center;
        }

        .filter-form input,
        .filter-form select {
            padding: 9px;
        }

        .filter-form input {
            flex: 1;
            min-width: 180px;
        }

        .product-link {
            color: #2563eb;
            text-decoration: none;
        }

        .product-link:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">

        <h1>Produtos</h1>

        <nav>
            <a href="{{ route('customers.index') }}"
               class="{{ request()->routeIs('customers.*') ? 'active' : '' }}">
                Clientes
            </a>

            <a href="{{ route('products.index') }}"
               class="{{ request()->routeIs('products.*') ? 'active' : '' }}">
                Produtos
            </a>

            <a href="{{ route('orders.index') }}"
               class="{{ request()->routeIs('orders.*') ? 'active' : '' }}">
                Pedidos
            </a>
        </nav>

        @if(session('success'))
            <p class="success-message">
                {{ session('success') }}
            </p>
        @endif

        @if(session('error'))
            <p class="error-message">
                {{ session('error') }}
            </p>
        @endif

        <a href="{{ route('products.create') }}" class="button">
            + Novo Produto
        </a>

        <form action="{{ route('products.index') }}" method="GET" class="filter-form">

            <select name="filter">
                <option value="name" {{ request('filter', 'name') == 'name' ? 'selected' : '' }}>Nome</option>
                <option value="id" {{ request('filter') == 'id' ? 'selected' : '' }}>ID</option>
                <option value="description" {{ request('filter') == 'description' ? 'selected' : '' }}>Descrição</option>
                <option value="price" {{ request('filter') == 'price' ? 'selected' : '' }}>Preço</option>
            </select>

            <input
                type="text"
                name="search"
                placeholder="Pesquisar produto..."
                value="{{ request('search') }}"
            >

            <select name="sort">
                <option value="id" {{ request('sort', 'id') == 'id' ? 'selected' : '' }}>Ordenar por ID</option>
                <option value="name" {{ request('sort') == 'name' ? 'selected' : '' }}>Ordenar por nome</option>
                <option value="description" {{ request('sort') == 'description' ? 'selected' : '' }}>Ordenar por descrição</option>
                <option value="price" {{ request('sort') == 'price' ? 'selected' : '' }}>Ordenar por preço</option>
                <option value="created_at" {{ request('sort') == 'created_at' ? 'selected' : '' }}>Data de cadastro</option>
            </select>

            <select name="direction">
                <option value="asc" {{ request('direction') == 'asc' ? 'selected' : '' }}>Crescente</option>
                <option value="desc" {{ request('direction', 'desc') == 'desc' ? 'selected' : '' }}>Decrescente</option>
            </select>

            <button type="submit" class="button" style="margin: 0;">
                Pesquisar
            </button>

            <a href="{{ route('products.index') }}" style="color: #2563eb;">
                Limpar filtros
            </a>
        </form>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                @forelse($produtos as $produto)
                    <tr>
                        <td>{{ $produto->id }}</td>

                        <td>
                            <a
                                href="{{ route('orders.index', ['filter' => 'product_id', 'search' => $produto->id]) }}"
                                class="product-link"
                            >
                                {{ $produto->name }}
                            </a>
                        </td>

                        <td>{{ $produto->description ?? '-' }}</td>

                        <td>R$ {{ number_format($produto->price, 2, ',', '.') }}</td>

                        <td>
                            <a
                                href="{{ route('products.edit', $produto->id) }}"
                                class="action-button edit-button"
                            >
                                Editar
                            </a>

                            <form
                                action="{{ route('products.destroy', $produto->id) }}"
                                method="POST"
                                class="delete-form"
                                onsubmit="return confirm('Tem certeza que deseja excluir este produto?')"
                            >
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="action-button delete-button">
                                    Excluir
                                </button>
                            </form>
                        </td>
                    </tr>

                @empty
                    <tr>
                        <td colspan="5">
                            Nenhum produto cadastrado.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div style="margin-top: 20px;">
            {{ $produtos->links() }}
        </div>

    </div>
</body>
</html>