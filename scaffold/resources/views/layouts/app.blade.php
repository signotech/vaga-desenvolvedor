<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Enzzo Pedidos') · Enzzo</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <style>
        body{background:#f5f7fb;color:#172033}.brand-logo{font-size:1.25rem!important;font-weight:700}
        nav{background:#172033}.container{width:94%;max-width:1440px}.card{border-radius:14px}
        .card-panel,.card{box-shadow:0 8px 24px rgba(20,30,50,.06)}.btn,.btn-small{border-radius:8px;background:#3157d5}
        .btn:hover{background:#2446b8}.muted{color:#778198}.stat{font-size:2rem;font-weight:700}
        table.striped>tbody>tr:nth-child(odd){background:#f8f9fc}.pagination li.active{background:#3157d5}
        .input-field input:focus+label{color:#3157d5!important}.input-field input:focus{border-bottom:1px solid #3157d5!important;box-shadow:0 1px 0 #3157d5!important}
        .status{padding:5px 10px;border-radius:20px;font-size:.78rem;background:#e9edf5}
        .status.open{background:#fff2cc;color:#805b00}.status.paid{background:#dff5e8;color:#176b3a}.status.cancelled{background:#ffe4e4;color:#a12626}
        @media(max-width:600px){.brand-logo{font-size:1rem!important}.container{width:96%}.hide-small{display:none}}
    </style>
</head>
<body>
<nav><div class="nav-wrapper container">
    <a href="{{ route('dashboard') }}" class="brand-logo">Enzzo <span style="font-weight:300">Pedidos</span></a>
    <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul class="right hide-on-med-and-down">
        <li><a href="{{ route('clientes.index') }}">Clientes</a></li>
        <li><a href="{{ route('produtos.index') }}">Produtos</a></li>
        <li><a href="{{ route('pedidos.index') }}">Pedidos</a></li>
        <li><form method="POST" action="{{ route('logout') }}">@csrf<button class="btn-flat white-text">Sair</button></form></li>
    </ul>
</div></nav>
<ul class="sidenav" id="mobile-nav">
    <li><a href="{{ route('dashboard') }}">Dashboard</a></li><li><a href="{{ route('clientes.index') }}">Clientes</a></li>
    <li><a href="{{ route('produtos.index') }}">Produtos</a></li><li><a href="{{ route('pedidos.index') }}">Pedidos</a></li>
    <li><form method="POST" action="{{ route('logout') }}">@csrf<button class="btn-flat">Sair</button></form></li>
</ul>
<main class="container" style="padding-top:28px;padding-bottom:48px">
    @if(session('success'))<div class="card-panel green lighten-5 green-text text-darken-3">{{ session('success') }}</div>@endif
    @if($errors->any())<div class="card-panel red lighten-5 red-text text-darken-3"><strong>Verifique:</strong><ul>@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>@endif
    @yield('content')
</main>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded',()=>{M.Sidenav.init(document.querySelectorAll('.sidenav'));});
function confirmDelete(message='Tem certeza que deseja excluir este registro?'){return confirm(message);}
function toggleAll(source){document.querySelectorAll('.row-check').forEach(c=>c.checked=source.checked);}
</script>
@stack('scripts')
</body></html>
