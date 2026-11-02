@extends('layouts.app')
@section('titulo', 'Cadastro')

@section('conteudo')
    <h1>Cadastro</h1>
    <div class="card card-auth">
        <form method="POST" action="{{ route('registro') }}">
            @csrf
            @foreach (['name' => ['Nome', 'text'], 'email' => ['E-mail', 'email'], 'password' => ['Senha (mínimo 8 caracteres)', 'password'], 'password_confirmation' => ['Confirmar senha', 'password']] as $campo => [$rotulo, $tipo])
                <div class="campo">
                    <label for="{{ $campo }}">{{ $rotulo }}</label>
                    <input id="{{ $campo }}" name="{{ $campo }}" type="{{ $tipo }}" @if ($tipo !== 'password') value="{{ old($campo) }}" @endif>
                    @error($campo) <div class="invalido">{{ $message }}</div> @enderror
                </div>
            @endforeach

            <button class="btn">Cadastrar</button>
            <a href="{{ route('login') }}">Já tenho conta</a>
        </form>
    </div>
@endsection
