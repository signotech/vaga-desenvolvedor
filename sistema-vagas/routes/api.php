<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VagaController;
use App\Http\Controllers\Api\CandidatoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
|
*/

// Isso cria automaticamente as rotas:
// GET /api/vagas
// POST /api/vagas
// GET /api/vagas/{vaga}
// PUT/PATCH /api/vagas/{vaga}
// DELETE /api/vagas/{vaga}
Route::apiResource('vagas', VagaController::class);
Route::apiResource('candidatos', CandidatoController::class);