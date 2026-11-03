<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Product significa Produto. O nome da classe fica em inglês para seguir a estrutura já usada pelo Laravel.
// Este Model representa os produtos cadastrados na tabela products (produtos).
class Product extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos no cadastro de um produto.
    // Mantemos aqui os campos que podem ser preenchidos pelo cadastro.
    protected $fillable = [
        'name',
        'description',
        'price',
    ];

    // orderItems() significa 'itens dos pedidos': mostra em quais pedidos o produto aparece.
    // hasMany() significa 'tem muitos': o mesmo produto pode estar em vários itens de pedidos.
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
