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

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProdutosController;

Route::get('/', function (){

    return view('menu');
});

//GESTÃO PRODUTOS

route::get('/produtos/{id}', [ProdutosController::class, 'produtos']);

//GESTÃO CLIENTES
route::get('/gestao/cliente', [EventController::class, 'create']);
route::post('/gestao/cliente/cadastro', [EventController::class, 'store']);


