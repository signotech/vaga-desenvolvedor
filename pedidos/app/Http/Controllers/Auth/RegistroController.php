<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistroRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class RegistroController extends Controller
{
    public function create()
    {
        return view('auth.registro');
    }

    public function store(RegistroRequest $request): RedirectResponse
    {
        $usuario = User::create($request->validated());

        Auth::login($usuario);
        $request->session()->regenerate();

        return redirect()->route('pedidos.index');
    }
}
