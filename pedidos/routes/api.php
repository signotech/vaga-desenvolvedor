<?php

use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\PedidoController;
use App\Http\Controllers\Api\ProdutoController;
use App\Http\Middleware\BasicSemSessao;
use Illuminate\Support\Facades\Route;

Route::middleware(BasicSemSessao::class)->group(function () {
    Route::delete('clientes', [ClienteController::class, 'destroyMany']);
    Route::delete('produtos', [ProdutoController::class, 'destroyMany']);
    Route::delete('pedidos', [PedidoController::class, 'destroyMany']);

    Route::apiResource('clientes', ClienteController::class)->names('api.clientes');
    Route::apiResource('produtos', ProdutoController::class)->names('api.produtos');
    Route::apiResource('pedidos', PedidoController::class)->names('api.pedidos');
});
