<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VagaController;
use App\Http\Controllers\CandidatoController;
use App\Http\Controllers\InscricaoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {

    
    Route::resource('vagas', VagaController::class);
    Route::patch('vagas/{vaga}/pausar', [VagaController::class, 'pausar'])->name('vagas.pausar');
    Route::delete('vagas/delete-many', [VagaController::class, 'deleteMany'])->name('vagas.deleteMany');

    Route::resource('candidatos', CandidatoController::class);
    
    Route::get('candidatos/{candidato}/inscricao', [InscricaoController::class, 'create'])->name('inscricao.create');
    Route::post('candidatos/{candidato}/inscricao', [InscricaoController::class, 'store'])->name('inscricao.store');
    

});

// Rotas de autenticação (geradas pelo Breeze)
require __DIR__.'/auth.php';
