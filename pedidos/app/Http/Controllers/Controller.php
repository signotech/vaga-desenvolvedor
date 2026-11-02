<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    public const POR_PAGINA = [10, 20, 50, 100];

    protected function porPagina(Request $request): int
    {
        $valor = $request->integer('por_pagina');

        return in_array($valor, self::POR_PAGINA) ? $valor : 20;
    }

    protected function idsSelecionados(Request $request): array
    {
        return $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer'],
        ])['ids'];
    }
}
