<?php

namespace App\Models;

use App\Models\Concerns\Listavel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produto extends Model
{
    use HasFactory, Listavel;

    protected $fillable = ['sku', 'titulo', 'preco', 'estoque'];

    public function itens(): HasMany
    {
        return $this->hasMany(ItemPedido::class);
    }
}
