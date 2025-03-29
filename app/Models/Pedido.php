<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model {
    
    use HasFactory, SoftDeletes;

    protected $table = 'pedidos';
    protected $fillable = ['cliente_id', 'status'];

    // Um pedido pertence a um cliente
    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    // Um pedido pode ter vários produtos
    public function produtos() {
        return $this->belongsToMany(Produto::class, 'pedidos_produtos')
                    ->withPivot('quantidade_produto')
                    ->withTimestamps();
    }
}
