<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\PedidoController;
use Illuminate\Support\Facades\Route;

// Rota da página inicial
Route::get('/', function () {
    return view('welcome'); // vamos criar essa view
});


Route::resource('pedidos', PedidoController::class);
Route::resource('clientes', ClienteController::class);

Route::resource('produtos', ProdutoController::class)->except(['show']);
Route::get('/produtos/json', [ProdutoController::class, 'json'])->name('produtos.json');
