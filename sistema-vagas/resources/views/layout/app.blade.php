<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Vagas</title>
    <style>
        body { font-family: sans-serif; margin: 0; background-color: #f4f4f4; }
        nav { background: #333; color: white; padding: 1rem; display: flex; align-items: center; }
        nav a { color: white; text-decoration: none; margin-right: 1.5rem; }
        .nav-logout { margin-left: auto; } /* Empurra o Sair para a direita */
        .nav-logout a { color: #ffcccc; text-decoration: underline; }
        .container { max-width: 1200px; margin: 2rem auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .alert { padding: 1rem; margin-bottom: 1rem; border-radius: 4px; }
        .alert-success { background: #d4edda; color: #155724; }
        .alert-danger { background: #f8d7da; color: #721c24; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.5rem; box-sizing: border-box; }
        .btn { padding: 0.75rem 1rem; border: none; border-radius: 4px; text-decoration: none; cursor: pointer; display: inline-block; }
        .btn-primary { background: #007bff; color: white; }
        .btn-secondary { background: #6c757d; color: white; }
        .btn-danger { background: #dc3545; color: white; }
        .btn-warning { background: #ffc107; color: black; }
        .btn-sm { padding: 0.25rem 0.5rem; }
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .filters { background: #f9f9f9; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
        .filters form { display: flex; gap: 1rem; align-items: flex-end; }

        /* === NOVOS ESTILOS DE PAGINAÇÃO ADICIONADOS AQUI === */
        .pagination {
            list-style: none; /* Remove os marcadores '•' */
            padding: 0;
            margin-top: 1.5rem;
            display: flex; /* Faz os itens ficarem na horizontal */
            gap: 5px;
        }
        .page-item {
            /* O 'display: flex' acima já cuida disso */
        }
        .page-link {
            display: block;
            padding: 0.5rem 0.75rem;
            color: #007bff;
            text-decoration: none;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .page-item.active .page-link {
            z-index: 1;
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
        }
        .page-item.disabled .page-link {
            color: #6c757d;
            pointer-events: none;
            background-color: #fff;
            border-color: #ddd;
        }
        /* Oculta os '« Previous' e 'Next »' se preferir só os ícones */
        .page-link span[aria-hidden="true"] {
            font-size: 1.2rem;
            line-height: 0.8;
        }
        /* Oculta o texto descritivo (acessibilidade) */
        .page-link .visually-hidden {
             display: none;
        }

    </style>
</head>
<body>
    <nav>
        <a href="{{ route('dashboard') }}">Dashboard</a>
        <a href="{{ route('vagas.index') }}">Vagas</a>
        <a href="{{ route('candidatos.index') }}">Candidatos</a>

        <div class="nav-logout">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <a href="{{ route('logout') }}" 
                   onclick="event.preventDefault(); this.closest('form').submit();">
                    Sair ({{ Auth::user()->name }})
                </a>
            </form>
        </div>
    </nav>

    <div class="container">
        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        @if ($errors->any())
            <div class="alert alert-danger">
                <strong>Ops!</strong> Ocorreram alguns erros:
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </div>
</body>
</html>