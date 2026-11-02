<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\Pedido;
use Illuminate\Database\Eloquent\Factories\Factory;

class PedidoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cliente_id' => Cliente::factory(),
            'data_pedido' => fake()->dateTimeBetween('-6 months'),
            'status' => fake()->randomElement(Pedido::STATUS),
            'desconto' => fake()->boolean(20) ? fake()->numberBetween(5, 30) : 0,
        ];
    }
}
