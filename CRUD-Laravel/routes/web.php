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

Route::get('/', function (){

    return view('menu');
});

route::get('/produtos/{id}', [EventController::class, 'produtos']);
route::get('/events/cliente', [EventController::class, 'create']);
route::post('/events/clientes/cadastro', [EventController::class, 'store']);


