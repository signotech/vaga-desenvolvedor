<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produto extends Model {
    
    use HasFactory;

    protected $table = 'produtos';
    protected $fillable = ['titulo', 'preco', 'estoque', 'codigo_sku'];
}
