<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pedido extends Model
{
    use HasFactory;

    public const STATUS = ['Em Aberto', 'Pago', 'Cancelado'];

    protected $fillable = ['cliente_id', 'data_pedido', 'status'];

    protected $casts = ['data_pedido' => 'datetime'];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function itens(): HasMany
    {
        return $this->hasMany(ItemPedido::class);
    }

    public function getTotalAttribute(): float
    {
        return $this->itens->sum(fn ($item) => $item->quantidade * $item->preco_unitario);
    }
}
