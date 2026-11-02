@extends('layouts.app')
@section('titulo', 'Entrar')

@section('conteudo')
    <h1>Entrar</h1>
    <div class="card card-auth">
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="campo">
                <label for="email">E-mail</label>
                <input id="email" name="email" type="email" value="{{ old('email') }}" autofocus>
                @error('email') <div class="invalido">{{ $message }}</div> @enderror
            </div>
            <div class="campo">
                <label for="password">Senha</label>
                <input id="password" name="password" type="password">
                @error('password') <div class="invalido">{{ $message }}</div> @enderror
            </div>
            <div class="campo">
                <label><input type="checkbox" name="lembrar" value="1"> Manter conectado</label>
            </div>

            <button class="btn">Entrar</button>
            <a href="{{ route('registro') }}">Criar conta</a>
        </form>
    </div>
@endsection
