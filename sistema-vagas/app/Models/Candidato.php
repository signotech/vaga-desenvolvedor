<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidato extends Model
{
    /** @use HasFactory<\Database\Factories\CandidatoFactory> */
    use HasFactory;
    protected $fillable = ['nome', 'email', 'telefone'];
    public function vagas() {
        return $this->belongsToMany(Vaga::class);
    }
}
