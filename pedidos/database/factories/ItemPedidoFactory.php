<?php

namespace Database\Factories;

use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemPedidoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'pedido_id' => Pedido::factory(),
            'produto_id' => Produto::factory(),
            'quantidade' => fake()->numberBetween(1, 5),
            'preco_unitario' => fn (array $atributos) => Produto::find($atributos['produto_id'])->preco,
        ];
    }
}
