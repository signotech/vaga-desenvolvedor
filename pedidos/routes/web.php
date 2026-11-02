<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/pedidos');

Route::delete('clientes', [ClienteController::class, 'destroyMany'])->name('clientes.destroy-many');
Route::delete('produtos', [ProdutoController::class, 'destroyMany'])->name('produtos.destroy-many');
Route::delete('pedidos', [PedidoController::class, 'destroyMany'])->name('pedidos.destroy-many');

Route::resource('clientes', ClienteController::class)->except('show');
Route::resource('produtos', ProdutoController::class)->except('show');
Route::resource('pedidos', PedidoController::class);
