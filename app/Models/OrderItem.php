<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// OrderItem significa Item do Pedido. Esse nome identifica cada produto incluído em um pedido.
// Mantemos o nome técnico em inglês para não quebrar os relacionamentos do Laravel.
class OrderItem extends Model
{
    // Informações que salvamos para cada item do pedido.
    // Cada registro representa um produto dentro de um pedido, com quantidade e preço da época.
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
    ];

    // order() significa 'pedido'. O nome em inglês é mantido para o Laravel reconhecer a relação.
    // belongsTo() significa 'pertence a': este item está ligado a um único pedido.
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    // product() significa 'produto'. O nome identifica o produto relacionado a este item.
    // belongsTo() significa 'pertence a': cada item aponta para um único produto.
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
