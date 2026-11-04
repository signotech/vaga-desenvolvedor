<?php

use App\Http\Controllers\Api\CustomerApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\ProductApiController;
use Illuminate\Support\Facades\Route;

Route::apiResource('customers', CustomerApiController::class);
Route::apiResource('products', ProductApiController::class);
Route::apiResource('orders', OrderApiController::class);
