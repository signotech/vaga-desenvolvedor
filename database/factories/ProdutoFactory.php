<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Produto>
 */
class ProdutoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'titulo' => $this->faker->word(),
            'preco' => $this->faker->randomFloat(2, 1, 2000),
            'estoque' => $this->faker->numberBetween(1, 500),
            'codigo_sku' => $this->faker->bothify('????-########-??'),
        ];
    }
}
