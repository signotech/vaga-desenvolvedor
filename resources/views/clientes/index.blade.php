@extends('layouts.main')

@section('content')
    
    <h3>Clientes</h3>

    @if (session('sucesso'))
        <p style="color: green;">{{ session('sucesso') }}</p>
    @endif

    <a href="{{ route('clientes.create') }}">Novo</a>

@endsection
