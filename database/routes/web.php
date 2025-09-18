<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatoController;
use App\Http\Controllers\VagaController;

Route::get('/', function () {
    return view('welcome');
});


Route::resource('vagas', VagaController::class);
Route::resource('candidatos', CandidatoController::class);
Route::post('vagas/{vaga}/toggle', [VagaController::class, 'toggle'])->name('vagas.toggle');


