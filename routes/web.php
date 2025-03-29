<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainController::class, 'index'])->name('index');

Route::prefix('clientes')->name('clientes.')->group(function() {
    Route::get('/', [ClienteController::class, 'index'])->name('index');

    Route::get('/create', [ClienteController::class, 'create'])->name('create');
    Route::post('/store', [ClienteController::class, 'store'])->name('store');
    
    Route::get('/{id}/edit', [ClienteController::class, 'edit'])->name('edit');
    Route::put('/{id}', [ClienteController::class, 'update'])->name('update');
    
    Route::delete('/{id}', [ClienteController::class, 'destroy'])->name('destroy');

    Route::get('/{id}', [ClienteController::class, 'show'])->name('show');
});

Route::prefix('produtos')->name('produtos.')->group(function() {
    Route::get('/', [ProdutoController::class, 'index'])->name('index');

    Route::get('/create', [ProdutoController::class, 'create'])->name('create');
    Route::post('/store', [ProdutoController::class, 'store'])->name('store');
    
    Route::get('/{id}/edit', [ProdutoController::class, 'edit'])->name('edit');
    Route::put('/{id}', [ProdutoController::class, 'update'])->name('update');
    
    Route::delete('/{id}', [ProdutoController::class, 'destroy'])->name('destroy');

    Route::get('/{id}', [ProdutoController::class, 'show'])->name('show');
});

Route::prefix('pedidos')->name('pedidos.')->group(function() {
    Route::get('/', [PedidoController::class, 'index'])->name('index');

    Route::get('/create', [PedidoController::class, 'create'])->name('create');
    Route::post('/store', [PedidoController::class, 'store'])->name('store');
    
    Route::get('/{id}/edit', [PedidoController::class, 'edit'])->name('edit');
    Route::put('/{id}', [PedidoController::class, 'update'])->name('update');
    
    Route::delete('/{id}', [PedidoController::class, 'destroy'])->name('destroy');
    
    Route::get('/{id}', [PedidoController::class, 'show'])->name('show');
});
