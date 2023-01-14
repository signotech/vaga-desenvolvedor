<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'tipo',
        'user_id',
        'pausada'
    ];

    public function criador() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function candidatos() {
        return $this->belongsToMany(User::class);
    }

    public static function filtrarPorParametros($params) {
        $vagas = self::select();
        $vagas = isset($params['tipo']) ? $vagas->where('tipo', $params['tipo']) : $vagas;
        $vagas = isset($params['nome']) ? $vagas->where('nome', 'like', '%'.$params['nome'].'%') : $vagas;
        $vagas = isset($params['ordenar']) ? $vagas->orderBy($params['ordenar']) : $vagas->orderBy('nome');

        return $vagas;
    }
}
