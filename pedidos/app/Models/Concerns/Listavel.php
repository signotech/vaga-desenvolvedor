<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait Listavel
{
    public function scopeListar(Builder $query, Request $request): Builder
    {
        $campos = static::CAMPOS;
        $exatos = static::EXATOS;
        $digitos = static::DIGITOS;

        foreach ($campos as $campo) {
            if (! $request->filled($campo)) {
                continue;
            }

            $valor = $request->input($campo);

            if (in_array($campo, $digitos)) {
                $valor = preg_replace('/\D/', '', $valor) ?: $valor;
            }

            if (! in_array($campo, $exatos)) {
                $query->where($campo, 'like', '%' . $valor . '%');
            } elseif (is_numeric($valor)) {
                $query->where($campo, $valor);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        $ordem = in_array($request->input('ordem'), $campos) ? $request->input('ordem') : 'id';
        $direcao = $request->input('direcao') === 'desc' ? 'desc' : 'asc';

        return $query->orderBy($ordem, $direcao);
    }
}
