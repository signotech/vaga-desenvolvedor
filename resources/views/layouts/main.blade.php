<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>