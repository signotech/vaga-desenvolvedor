{{-- Essa é a lista de clientes, com pesquisa, ordenação e ações de cadastro. --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes - Signotech</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 30px;
        }

        .container {
            max-width: 1000px;
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

        .action-button:hover {
            opacity: 0.9;
        }

        .delete-form {
            display: inline;
        }

        .customer-link {
            color: #2563eb;
            text-decoration: none;
        }

        .customer-link:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">

        <h1>Clientes</h1>

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

        <a href="{{ route('customers.create') }}" class="button">
            + Novo Cliente
        </a>

        <form action="{{ route('customers.index') }}" method="GET"
              style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">

            <select name="filter" style="padding: 9px;">
                <option value="name" {{ request('filter', 'name') == 'name' ? 'selected' : '' }}>Nome</option>
                <option value="id" {{ request('filter') == 'id' ? 'selected' : '' }}>ID</option>
                <option value="email" {{ request('filter') == 'email' ? 'selected' : '' }}>E-mail</option>
                <option value="phone" {{ request('filter') == 'phone' ? 'selected' : '' }}>Telefone</option>
            </select>

            <input
                type="text"
                name="search"
                placeholder="Pesquisar cliente..."
                value="{{ request('search') }}"
                style="padding: 9px; flex: 1; min-width: 180px;"
            >

            <select name="sort" style="padding: 9px;">
                <option value="id" {{ request('sort', 'id') == 'id' ? 'selected' : '' }}>Ordenar por ID</option>
                <option value="name" {{ request('sort') == 'name' ? 'selected' : '' }}>Ordenar por nome</option>
                <option value="email" {{ request('sort') == 'email' ? 'selected' : '' }}>Ordenar por e-mail</option>
                <option value="phone" {{ request('sort') == 'phone' ? 'selected' : '' }}>Ordenar por telefone</option>
                <option value="created_at" {{ request('sort') == 'created_at' ? 'selected' : '' }}>Data de cadastro</option>
            </select>

            <select name="direction" style="padding: 9px;">
                <option value="asc" {{ request('direction') == 'asc' ? 'selected' : '' }}>Crescente</option>
                <option value="desc" {{ request('direction', 'desc') == 'desc' ? 'selected' : '' }}>Decrescente</option>
            </select>

            <button type="submit" class="button" style="margin: 0;">
                Pesquisar
            </button>

            <a href="{{ route('customers.index') }}" style="color: #2563eb;">
                Limpar filtros
            </a>
        </form>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                @forelse($clientes as $cliente)
                    <tr>
                        <td>{{ $cliente->id }}</td>

                        <td>
                            <a
                                href="{{ route('orders.index', ['filter' => 'customer_id', 'search' => $cliente->id]) }}"
                                class="customer-link"
                            >
                                {{ $cliente->name }}
                            </a>
                        </td>

                        <td>{{ $cliente->email }}</td>
                        <td>{{ $cliente->phone ?? '-' }}</td>

                        <td>
                            <a
                                href="{{ route('customers.edit', $cliente->id) }}"
                                class="action-button edit-button"
                            >
                                Editar
                            </a>

                            <form
                                action="{{ route('customers.destroy', $cliente->id) }}"
                                method="POST"
                                class="delete-form"
                                onsubmit="return confirm('Tem certeza que deseja excluir este cliente?')"
                            >
                                @csrf
                                @method('DELETE')

                                <button
                                    type="submit"
                                    class="action-button delete-button"
                                >
                                    Excluir
                                </button>
                            </form>
                        </td>
                    </tr>

                @empty
                    <tr>
                        <td colspan="5">
                            Nenhum cliente cadastrado.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div style="margin-top: 20px;">
            {{ $clientes->links() }}
        </div>

    </div>
</body>
</html>
