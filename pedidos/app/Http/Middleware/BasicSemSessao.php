<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BasicSemSessao
{
    // HTTP Basic (e-mail e senha) a cada requisição, sem criar sessão
    public function handle(Request $request, Closure $next)
    {
        if (Auth::onceBasic() !== null) {
            return response()->json(['message' => 'Credenciais ausentes ou inválidas.'], 401, ['WWW-Authenticate' => 'Basic']);
        }

        return $next($request);
    }
}
