@extends('layouts.app')
@section('titulo', 'Entrar')

@section('conteudo')
    <div class="row">
        <div class="col s12 m8 l5 offset-m2 offset-l3">
            <div class="card">
                <form method="POST" action="{{ route('login') }}" class="card-content">
                    @csrf
                    <span class="card-title">Entrar</span>
                    <div class="input-field">
                        <input id="email" name="email" type="email" value="{{ old('email') }}" autofocus class="@error('email') invalid @enderror">
                        <label for="email">E-mail</label>
                        @error('email') <span class="helper-text red-text">{{ $message }}</span> @enderror
                    </div>
                    <div class="input-field">
                        <input id="password" name="password" type="password" class="@error('password') invalid @enderror">
                        <label for="password">Senha</label>
                        @error('password') <span class="helper-text red-text">{{ $message }}</span> @enderror
                    </div>
                    <p>
                        <label><input type="checkbox" name="lembrar" value="1"><span>Manter conectado</span></label>
                    </p>
                    <br>
                    <button class="btn blue-grey darken-3">Entrar</button>
                    <a class="btn-flat" href="{{ route('registro') }}">Criar conta</a>
                </form>
            </div>
        </div>
    </div>
@endsection
