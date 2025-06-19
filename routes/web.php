<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PositionsController;
use App\Http\Controllers\ApplicationController;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/apply', [ApplicationController::class, 'store'])->name('position.apply');
    
    Route::get('/positions/{position}/edit', [PositionsController::class, 'edit'])->name('positions.edit');
    Route::patch('/position/{position}', [PositionsController::class, 'update'])->name('positions.update');
    Route::delete('/position/{position}', [PositionsController::class, 'destroy'])->name('positions.destroy');
    Route::get('/position/create', [PositionsController::class, 'create'])->name('positions.create');
    Route::post('/positions', [PositionsController::class, 'store'])->name('positions.store');
});

Route::get('/positions', [PositionsController::class, 'index'])
    ->name('positions.index');

require __DIR__.'/auth.php';
