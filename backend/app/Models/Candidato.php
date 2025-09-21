<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Candidato extends Model
{
    use HasFactory;

    protected $table = 'candidatos';

    protected $fillable = [
        'nome',
        'email',
    ];

    public function vagas()
    {
        return $this->belongsToMany(Vaga::class, 'candidato_vaga')
                    ->withTimestamps();
    }
}
