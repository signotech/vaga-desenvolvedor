<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model {
    
    use HasFactory;

    protected $table = 'clientes';
    protected $fillable = ['nome', 'cpf', 'email'];
}
