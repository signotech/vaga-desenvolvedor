<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProdutoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'sku' => strtoupper(fake()->unique()->bothify('??-####')),
            'titulo' => ucfirst(fake()->words(3, true)),
            'preco' => fake()->randomFloat(2, 5, 500),
            'estoque' => fake()->numberBetween(0, 200),
        ];
    }
}
