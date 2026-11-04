<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
<title>Entrar · Enzzo Pedidos</title></head><body style="background:#f4f6fb"><div class="container" style="max-width:440px;margin-top:9vh">
<div class="card" style="padding:28px;border-radius:16px"><h4>Enzzo <span class="grey-text">Pedidos</span></h4><p class="grey-text">Acesse o painel de compras</p>
@if($errors->any())<div class="red-text">{{ $errors->first() }}</div>@endif
<form method="POST" action="{{ route('login.store') }}">@csrf
<div class="input-field"><input id="email" name="email" type="email" value="{{ old('email') }}" required><label for="email">E-mail</label></div>
<div class="input-field"><input id="password" name="password" type="password" required><label for="password">Senha</label></div>
<p><label><input type="checkbox" name="remember"><span>Manter conectado</span></label></p>
<button class="btn waves-effect waves-light" style="width:100%">Entrar</button></form>
<p class="grey-text" style="font-size:12px;margin-top:22px">Acesso de demonstração: admin@pedidos.local / password</p></div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script></body></html>
