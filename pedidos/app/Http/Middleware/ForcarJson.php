<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForcarJson
{
    // a API sempre responde JSON, mesmo sem o cabeçalho Accept
    public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
