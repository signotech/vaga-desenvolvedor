<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Customer significa Cliente. Mantemos esse nome em inglês porque ele identifica a classe do Laravel.
// Este Model representa os clientes que ficam na tabela customers (clientes).
class Customer extends Model
{
    use HasFactory;

    // Esses são os campos que podemos preencher ao cadastrar um cliente.
    // O Laravel só permite preencher estes campos em operações de criação e atualização.
    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    // orders() significa 'pedidos'. Mantemos o nome em inglês porque é usado pelo Laravel.
    // hasMany() significa 'tem muitos': um cliente pode possuir vários pedidos.
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
