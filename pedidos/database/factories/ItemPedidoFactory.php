<?php

namespace Database\Factories;

use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemPedidoFactory extends Factory
{
    public function definition(): array
    {
        $produto = Produto::factory()->create();

        return [
            'pedido_id' => Pedido::factory(),
            'produto_id' => $produto->id,
            'quantidade' => fake()->numberBetween(1, 5),
            'preco_unitario' => $produto->preco,
        ];
    }
}
