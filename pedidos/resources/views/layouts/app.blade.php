<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('titulo') - Pedidos</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; background: #f4f5f7; color: #222; }
        nav { background: #1f3a5f; padding: 0 20px; display: flex; gap: 4px; flex-wrap: wrap; }
        nav a { color: #fff; text-decoration: none; padding: 14px 16px; }
        nav a.ativo, nav a:hover { background: #2d5185; }
        nav .usuario { margin-left: auto; display: flex; align-items: center; gap: 10px; color: #fff; font-size: 14px; }
        nav .usuario form { margin: 0; }
        .card-auth { max-width: 420px; }
        main { max-width: 1100px; margin: 24px auto; padding: 0 16px; }
        h1 { margin: 0 0 16px; font-size: 22px; }
        .topo { display: flex; justify-content: space-between; align-items: center; }
        .card { background: #fff; border-radius: 6px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.1); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
        th a { color: inherit; text-decoration: none; }
        input, select { padding: 7px; border: 1px solid #c4c8cf; border-radius: 4px; width: 100%; font-size: 14px; }
        .filtros input, .filtros select { padding: 5px; }
        .btn { display: inline-block; background: #1f3a5f; color: #fff; border: 0; padding: 8px 14px; border-radius: 4px; cursor: pointer; text-decoration: none; font-size: 14px; width: auto; }
        .btn.sec { background: #6b7280; }
        .btn.perigo { background: #b42318; }
        .btn.peq { padding: 4px 9px; font-size: 13px; }
        input[type=checkbox] { width: auto; }
        .barra { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
        .barra form { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 14px; }
        .barra select { width: auto; }
        .acoes { display: flex; gap: 6px; }
        .acoes form { margin: 0; }
        .msg { padding: 10px 14px; border-radius: 4px; margin-bottom: 14px; }
        .msg.ok { background: #d1fae5; color: #065f46; }
        .msg.erro { background: #fee2e2; color: #991b1b; }
        .campo { margin-bottom: 12px; }
        .campo label { display: block; margin-bottom: 4px; font-size: 14px; font-weight: bold; }
        .invalido { color: #b42318; font-size: 13px; margin-top: 3px; }
        .paginacao { display: flex; gap: 4px; margin-top: 14px; flex-wrap: wrap; }
        .paginacao a, .paginacao span { padding: 5px 10px; border: 1px solid #c4c8cf; border-radius: 4px; text-decoration: none; color: #1f3a5f; font-size: 14px; background: #fff; }
        .paginacao .atual { background: #1f3a5f; color: #fff; }
        .paginacao .off { color: #9ca3af; }
        .status { padding: 2px 8px; border-radius: 10px; font-size: 12px; }
        .status.Pago { background: #d1fae5; }
        .status.Cancelado { background: #fee2e2; }
        .status.Aberto, .status.Em { background: #fef3c7; }
        a { color: #1f3a5f; }
    </style>
</head>
<body>
    <nav>
        @auth
            <a href="{{ route('pedidos.index') }}" class="{{ request()->routeIs('pedidos.*') ? 'ativo' : '' }}">Pedidos</a>
            <a href="{{ route('clientes.index') }}" class="{{ request()->routeIs('clientes.*') ? 'ativo' : '' }}">Clientes</a>
            <a href="{{ route('produtos.index') }}" class="{{ request()->routeIs('produtos.*') ? 'ativo' : '' }}">Produtos</a>
            <div class="usuario">
                <span>{{ auth()->user()->name }}</span>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button class="btn sec peq">Sair</button>
                </form>
            </div>
        @endauth
    </nav>
    <main>
        @if (session('ok')) <div class="msg ok">{{ session('ok') }}</div> @endif
        @if (session('erro')) <div class="msg erro">{{ session('erro') }}</div> @endif
        @yield('conteudo')
    </main>
</body>
</html>
