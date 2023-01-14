<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VagaController;
use App\Http\Controllers\CandidaturaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route('vagas.index'));
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('candidaturas', CandidaturaController::class)->only([
        'index', 'store'
    ]);
    Route::delete('candidaturas/{vaga}', [CandidaturaController::class, 'destroy'])->name('candidaturas.destroy');
});

Route::resource('vagas', VagaController::class);

Route::get('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken('token');
 
    return ['token' => $token->plainTextToken];
});

require __DIR__.'/auth.php';
