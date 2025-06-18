<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    /** @use HasFactory<\Database\Factories\VagaFactory> */
    use HasFactory;

    protected $fillable = [
        'titulo',
        'regime',
        'tipo',
        'descricao',
        'requisitos',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
