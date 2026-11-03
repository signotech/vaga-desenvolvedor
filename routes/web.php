<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

// Quando alguém abrir o endereço principal, vai para a lista de clientes.
Route::get('/', function () {
    return redirect()->route('customers.index');
});

// O Laravel cria as rotas de cadastro, edição, atualização e exclusão.
// Não usamos a rota show porque não temos uma tela separada para visualizar um registro.
Route::resource('customers', CustomerController::class)->except(['show']);
Route::resource('products', ProductController::class)->except(['show']);
Route::resource('orders', OrderController::class)->except(['show']);
