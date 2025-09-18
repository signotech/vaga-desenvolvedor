<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pedido;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = ['sku', 'titulo', 'descricao', 'preco', 'estoque'];

    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, 'pedido_produto')
                    ->withPivot('quantidade','preco_unitario')
                    ->withTimestamps();
    }
}
