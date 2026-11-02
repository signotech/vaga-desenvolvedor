<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/pedidos');

Route::resource('clientes', ClienteController::class)->except('show');
Route::resource('produtos', ProdutoController::class)->except('show');
Route::resource('pedidos', PedidoController::class);
