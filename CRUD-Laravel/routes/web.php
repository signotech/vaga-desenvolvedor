<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;

Route::get('/', function (){

    return view('menu');
});

//GESTÃO PRODUTOS

route::get('/produtos/{id}', [ProductController::class, 'produtos']);

//GESTÃO CLIENTES
route::get('/gestao/cliente', [ClientController::class, 'create']);
route::post('/gestao/cliente/cadastro', [ClientController::class, 'store']);



Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
