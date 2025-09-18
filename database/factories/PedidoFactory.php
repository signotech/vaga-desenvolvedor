<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cliente;
use App\Models\Produto;

class PedidoFactory extends Factory
{
    protected $model = \App\Models\Pedido::class;

    public function definition()
{
    return [
        'cliente_id' => Cliente::factory(),
        'status' => $this->faker->randomElement(['Em Aberto', 'Pago', 'Cancelado']),
        'data_pedido' => $this->faker->dateTimeThisYear(),
    ];
}
    public function configure()
    {
        return $this->afterCreating(function ($pedido) {
            $produtos = Produto::inRandomOrder()->take(rand(1, 5))->get();

            foreach ($produtos as $produto) {
                $pedido->produtos()->attach($produto->id, [
                    'quantidade' => rand(1, 10),
                    'preco_unitario' => $produto->preco, // <- aqui
                ]);
            }
        });
    }
}
