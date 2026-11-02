<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }

    public function store(LoginRequest $request)
    {
        $chave = Str::lower($request->input('email')).'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($chave, 5)) {
            $segundos = RateLimiter::availableIn($chave);

            return response(view('auth.login')->withErrors([
                'email' => trans('validation.tentativas', ['segundos' => $segundos]),
            ]), 429, ['Retry-After' => $segundos]);
        }

        if (! Auth::attempt($request->only('email', 'password'), $request->boolean('lembrar'))) {
            RateLimiter::hit($chave);

            return back()->withInput($request->only('email'))
                ->withErrors(['email' => trans('validation.credenciais')]);
        }

        RateLimiter::clear($chave);
        $request->session()->regenerate();

        return redirect()->intended(route('pedidos.index'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
