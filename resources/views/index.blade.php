@extends('layouts.main')

@section('content')
    <div class="container mt-5">
        <h3 class="text-center">Bem-vindo ao Sistema de Pedidos de Compra</h3>

        <!-- Cartões de navegação -->
        <div class="row mt-4">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Clientes</h5>
                        <p class="card-text">Cadastre e gerencie os clientes cadastrados no sistema.</p>
                        <a href="{{ route('clientes.index') }}" class="btn btn-primary">Ver Clientes</a>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Produtos</h5>
                        <p class="card-text">Cadastre e gerencie os produtos vendidos no sistema.</p>
                        <a href="{{ route('produtos.index') }}" class="btn btn-primary">Ver Produtos</a>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Pedidos</h5>
                        <p class="card-text">Cadastre e gerencie os pedidos realizados no sistema.</p>
                        <a href="{{ route('pedidos.index') }}" class="btn btn-primary">Ver Pedidos</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
