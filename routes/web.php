<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainController::class, 'index'])->name('index');

Route::prefix('clientes')->name('clientes.')->group(function() {
    Route::get('/', [ClienteController::class, 'index'])->name('index');
});

Route::prefix('produtos')->name('produtos.')->group(function() {
    Route::get('/', [ProdutoController::class, 'index'])->name('index');
});

Route::prefix('pedidos')->name('pedidos.')->group(function() {
    Route::get('/', [PedidoController::class, 'index'])->name('index');
});
