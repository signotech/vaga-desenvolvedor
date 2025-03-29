<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PedidoProduto extends Model {
    
    use HasFactory, SoftDeletes;

    protected $table = 'pedidos_produtos';
    protected $fillable = ['pedido_id', 'produto_id', 'quantidade_produto'];
}
