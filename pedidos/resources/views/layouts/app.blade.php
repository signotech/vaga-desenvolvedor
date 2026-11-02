<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('titulo') - Pedidos</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <style>
        body { background: #f4f5f7; color: #222; }
        .container { width: 95%; max-width: 1280px; }
        .tabela { overflow-x: auto; }
        .chip { white-space: nowrap; }
        .tabela table { min-width: 640px; }
        main.container { margin-top: 32px; margin-bottom: 24px; }
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

        /* celular: cada linha da tabela vira um card */
        @media (max-width: 600px) {
            .tabela table { min-width: 0; }
            .tabela table, .tabela thead, .tabela tbody, .tabela tr, .tabela td, .tabela th { display: block; width: 100%; }
            .tabela th, .tabela td { border: 0; padding: 6px 0; }

            /* cabeçalho vira uma linha de links para ordenar */
            .tabela thead tr:first-child { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-bottom: 10px; }
            .tabela thead tr:first-child::before { content: 'Ordenar por:'; font-size: 0.8rem; color: #757575; }
            .tabela thead tr:first-child th { width: auto; padding: 4px 12px; border-radius: 16px; background: #eceff1; }
            .tabela thead tr:first-child th:not(:has(a)) { display: none; }

            /* filtros em duas colunas */
            .tabela .filtros { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
            .tabela .filtros th { flex: 1 1 calc(50% - 8px); width: auto; padding: 0; }
            .tabela .filtros th:empty { display: none; }
            .tabela .filtros th.acoes { flex-basis: 100%; }
            .tabela .filtros input { width: 100%; }

            .tabela tbody tr, .tabela table.striped > tbody > tr:nth-child(odd) { border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 12px; padding: 8px 12px; background-color: #fff; }
            .tabela tbody td[data-label] { display: flex; justify-content: space-between; gap: 12px; text-align: right; }
            .tabela tbody td[data-label]::before { content: attr(data-label); font-weight: 500; color: #757575; text-align: left; }
            .tabela tbody td.acoes { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 10px; border-top: 1px solid #eceff1; margin-top: 6px; }
        }
    </style>
</head>
<body>
    @auth
        <nav class="blue-grey darken-3">
            <div class="nav-wrapper container">
                <a href="{{ route('pedidos.index') }}" class="brand-logo">Pedidex</a>
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
