<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistroRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class RegistroController extends Controller
{
    public function create()
    {
        return view('auth.registro');
    }

    public function store(RegistroRequest $request): RedirectResponse
    {
        User::create($request->validated());

        return redirect()->route('pedidos.index')->with('ok', 'Usuário criado.');
    }
}
