@extends('layouts.app')
@section('titulo', 'Cadastro')

@section('conteudo')
    <div class="row">
        <div class="col s12 m8 l5 offset-m2 offset-l3">
            <div class="card">
                <form method="POST" action="{{ route('registro') }}" class="card-content">
                    @csrf
                    <span class="card-title">Cadastro</span>
                    @foreach (['name' => ['Nome', 'text'], 'email' => ['E-mail', 'email'], 'password' => ['Senha (mínimo 8 caracteres)', 'password'], 'password_confirmation' => ['Confirmar senha', 'password']] as $campo => [$rotulo, $tipo])
                        <div class="input-field">
                            <input id="{{ $campo }}" name="{{ $campo }}" type="{{ $tipo }}" class="@error($campo) invalid @enderror" @if ($tipo !== 'password') value="{{ old($campo) }}" @endif>
                            <label for="{{ $campo }}">{{ $rotulo }}</label>
                            @error($campo) <span class="helper-text red-text">{{ $message }}</span> @enderror
                        </div>
                    @endforeach
                    <br>
                    <button class="btn blue-grey darken-3">Cadastrar</button>
                    <a class="btn-flat" href="{{ route('login') }}">Já tenho conta</a>
                </form>
            </div>
        </div>
    </div>
@endsection
