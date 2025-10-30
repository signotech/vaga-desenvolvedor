@extends('layout.app') @section('content')
    <div class="flex-between">
        <h1>Dashboard</h1>
    </div>

    <div style="padding: 1.5rem; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #eee;">
        <p style="font-size: 1.2rem; margin-top: 0;">
            Olá, <strong>{{ Auth::user()->name }}</strong>!
        </p>
        <p>Você está autenticado e no painel principal.</p>
        <p>Use a barra de navegação acima para acessar as seções de <strong>Vagas</strong> e <strong>Candidatos</strong>.</p>
    </div>
@endsection