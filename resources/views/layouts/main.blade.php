<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sistema de Pedidos de Compra</title>
</head>
<body>
    
    <header>
        <nav>
            <a href="{{ route('index') }}">Home</a>
            <a href="{{ route('clientes.index') }}">Clientes</a>
            <a href="{{ route('produtos.index') }}">Produtos</a>
            <a href="{{ route('pedidos.index') }}">Pedidos</a>
        </nav>
    </header>

    @yield('content')

    <script>
        function confirmDelete(event) {
            event.preventDefault();
    
            if (confirm("Tem certeza que deseja excluir este registro?")) {
                event.target.submit();
            }
        }
    </script>
</body>
</html>