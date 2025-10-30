<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    /** @use HasFactory<\Database\Factories\VagaFactory> */
    use HasFactory;

    protected $fillable = ['titulo', 'descricao', 'tipo', 'status'];
    public function candidatos() {
        return $this->belongsToMany(Candidato::class);
    }
}


