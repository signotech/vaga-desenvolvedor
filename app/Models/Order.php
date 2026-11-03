<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Order significa Pedido. Mantemos o nome em inglês porque ele é usado pelo Laravel e pelos relacionamentos do projeto.
// Este Model representa os pedidos feitos pelos clientes.
class Order extends Model
{
    // Campos que podem ser preenchidos ao criar ou alterar um pedido.
    // customer_id significa 'identificador do cliente': guarda o ID do cliente ligado ao pedido.
    // status significa 'situação' e informa se o pedido está aberto, pago ou cancelado.
    protected $fillable = [
        'customer_id',
        'status',
    ];

    // customer() significa 'cliente'. O nome do método fica em inglês para acompanhar
    // o nome da relação usado pelo Laravel nas consultas e nas telas.
    // belongsTo() significa 'pertence a': informa que este pedido pertence a um cliente.
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    // orderItems() significa 'itens do pedido'. O nome identifica a lista de produtos do pedido.
    // hasMany() significa 'tem muitos': um pedido pode ter vários itens na tabela order_items.
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
