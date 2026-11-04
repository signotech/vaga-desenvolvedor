<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'show'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::resource('clientes', CustomerController::class)->parameters(['clientes' => 'customer']);
    Route::delete('clientes/bulk/destroy', [CustomerController::class, 'bulkDestroy'])->name('clientes.bulk-destroy');

    Route::resource('produtos', ProductController::class)->parameters(['produtos' => 'product']);
    Route::delete('produtos/bulk/destroy', [ProductController::class, 'bulkDestroy'])->name('produtos.bulk-destroy');

    Route::resource('pedidos', OrderController::class)->parameters(['pedidos' => 'order']);
    Route::delete('pedidos/bulk/destroy', [OrderController::class, 'bulkDestroy'])->name('pedidos.bulk-destroy');
});
