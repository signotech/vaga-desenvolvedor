<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('titulo') - Pedidos</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <style>
        main { margin-top: 24px; margin-bottom: 24px; }
        h1 { font-size: 1.8rem; margin: 0; }
        .topo { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .acoes { white-space: nowrap; }
        .acoes form { display: inline; }
        .filtros input, .filtros select { height: 2.2rem; margin: 0; font-size: 14px; min-width: 90px; }
        .barra { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
        .barra form { display: flex; align-items: center; gap: 8px; margin: 0; }
        td, th { padding: 8px 6px; }
        .item { display: flex; align-items: flex-start; gap: 8px; }
        .item .input-field { margin: 0.5rem 0; }
        .item .produto { flex: 1; min-width: 0; }
        .item .quantidade { width: 90px; }
        nav .brand-logo { font-size: 1.4rem; }
    </style>
</head>
<body>
    @auth
        <nav class="blue-grey darken-3">
            <div class="nav-wrapper container">
                <a href="{{ route('pedidos.index') }}" class="brand-logo">Pedidos</a>
                <a href="#" data-target="menu-lateral" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li class="{{ request()->routeIs('pedidos.*') ? 'active' : '' }}"><a href="{{ route('pedidos.index') }}">Pedidos</a></li>
                    <li class="{{ request()->routeIs('clientes.*') ? 'active' : '' }}"><a href="{{ route('clientes.index') }}">Clientes</a></li>
                    <li class="{{ request()->routeIs('produtos.*') ? 'active' : '' }}"><a href="{{ route('produtos.index') }}">Produtos</a></li>
                    <li><span class="white-text" style="padding: 0 15px">{{ auth()->user()->name }}</span></li>
                    <li>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button class="btn-flat white-text">Sair</button>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="menu-lateral">
            <li><span class="grey-text" style="padding: 0 32px">{{ auth()->user()->name }}</span></li>
            <li><div class="divider"></div></li>
            <li class="{{ request()->routeIs('pedidos.*') ? 'active' : '' }}"><a href="{{ route('pedidos.index') }}">Pedidos</a></li>
            <li class="{{ request()->routeIs('clientes.*') ? 'active' : '' }}"><a href="{{ route('clientes.index') }}">Clientes</a></li>
            <li class="{{ request()->routeIs('produtos.*') ? 'active' : '' }}"><a href="{{ route('produtos.index') }}">Produtos</a></li>
            <li>
                <form method="POST" action="{{ route('logout') }}" style="padding: 0 32px">
                    @csrf
                    <button class="btn-flat">Sair</button>
                </form>
            </li>
        </ul>
    @endauth
    <main class="container">
        @if (session('ok')) <div class="card-panel green lighten-4 green-text text-darken-4">{{ session('ok') }}</div> @endif
        @if (session('erro')) <div class="card-panel red lighten-4 red-text text-darken-4">{{ session('erro') }}</div> @endif
        @yield('conteudo')
    </main>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            M.Sidenav.init(document.querySelectorAll('.sidenav'));
            M.FormSelect.init(document.querySelectorAll('select:not(.browser-default)'));
            M.updateTextFields();
        });
    </script>
</body>
</html>
