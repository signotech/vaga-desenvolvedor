<?php

use App\Http\Controllers\VagaController;
use App\Http\Controllers\CandidatoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('vagas', VagaController::class);
Route::apiResource('candidatos', CandidatoController::class);
