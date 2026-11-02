<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait Listavel
{
    public function scopeListar(Builder $query, Request $request, array $campos): Builder
    {
        foreach ($campos as $campo) {
            if ($request->filled($campo)) {
                $query->where($campo, 'like', '%' . $request->input($campo) . '%');
            }
        }

        $ordem = in_array($request->input('ordem'), $campos) ? $request->input('ordem') : 'id';
        $direcao = $request->input('direcao') === 'desc' ? 'desc' : 'asc';

        return $query->orderBy($ordem, $direcao);
    }
}
