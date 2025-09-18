<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>App de Pedidos</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}?v={{ time() }}">
</head>

<body>
    <nav>
        <a href="{{ route('clientes.index') }}" class="{{ request()->is('clientes*') ? 'active' : '' }}">Clientes</a>
        <a href="{{ route('produtos.index') }}" class="{{ request()->is('produtos*') ? 'active' : '' }}">Produtos</a>
        <a href="{{ route('pedidos.index') }}" class="{{ request()->is('pedidos*') ? 'active' : '' }}">Pedidos</a>
    </nav>

    <div class="container">
        @yield('content')
    </div>

    @if(session('success'))
    <div style="color:green; margin-bottom:10px;">
        {{ session('success') }}
    </div>
    @endif

    @if(session('error'))
    <div style="color:red; margin-bottom:10px;">
        {{ session('error') }}
    </div>
    @endif

    {{-- Scripts específicos das views --}}
    @yield('scripts')
</body>

</html>