<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistroController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/pedidos');

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('registro', [RegistroController::class, 'create'])->name('registro');
    Route::post('registro', [RegistroController::class, 'store']);

    Route::delete('clientes', [ClienteController::class, 'destroyMany'])->name('clientes.destroy-many');
    Route::delete('produtos', [ProdutoController::class, 'destroyMany'])->name('produtos.destroy-many');
    Route::delete('pedidos', [PedidoController::class, 'destroyMany'])->name('pedidos.destroy-many');

    Route::resource('clientes', ClienteController::class)->except('show');
    Route::resource('produtos', ProdutoController::class)->except('show');
    Route::resource('pedidos', PedidoController::class);
});
