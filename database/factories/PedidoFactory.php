<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pedido>
 */
class PedidoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'cliente_id' => Cliente::factory(),
            'Status' => $this->faker->randomElement(['Em Aberto', 'Pago', 'Cancelado'])
        ];
    }

    public function configure() {
        return $this->afterCreating(function (Pedido $pedido) {

            $produtos = Produto::inRandomOrder()->limit(rand(1, 5))->get();

            foreach ($produtos as $produto) {
                $pedido->produtos()->attach($produto->id, [
                    'quantidade_produto' => rand(1, 10)
                ]);
            }
        });
    }
}
