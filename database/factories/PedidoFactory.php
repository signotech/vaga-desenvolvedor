<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use Carbon\Carbon;
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
            'cliente_id' => Cliente::inRandomOrder()->first()->id ?? Cliente::factory()->create()->id,
            'status' => $this->faker->randomElement(['Em Aberto', 'Pago', 'Cancelado']),
            'created_at' => Carbon::now()->subDays(rand(1, 30)),
        ];
    }

    public function configure() {
        return $this->afterCreating(function (Pedido $pedido) {

            $produtos = Produto::where('estoque', '>', 0)->inRandomOrder()->limit(rand(1, 3))->get();

            $valorTotal = 0;
            foreach ($produtos as $produto) {

                $quantidade = rand(1, min(5, $produto->estoque));
                $valorProduto = $produto->preco * $quantidade;

                $pedido->produtos()->attach($produto->id, [
                    'quantidade_produto' => $quantidade,
                    'valor_produto' => $valorProduto,
                ]);

                $produto->decrement('estoque', $quantidade);
                $valorTotal+=$valorProduto;
            }

            $pedido->update(['valor_total' => $valorTotal]);
        });
    }
}
