<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'order_status_id', 'ordered_at', 'discount'];

    protected function casts(): array
    {
        return ['ordered_at' => 'datetime', 'discount' => 'decimal:2'];
    }

    public function customer(): BelongsTo { return $this->belongsTo(Customer::class); }
    public function status(): BelongsTo { return $this->belongsTo(OrderStatus::class, 'order_status_id'); }
    public function items(): HasMany { return $this->hasMany(OrderItem::class); }

    public function getSubtotalAttribute(): float
    {
        return (float) $this->items->sum(fn ($item) => $item->quantity * (float) $item->unit_price);
    }

    public function getTotalAttribute(): float
    {
        return max(0, $this->subtotal - (float) $this->discount);
    }
}
