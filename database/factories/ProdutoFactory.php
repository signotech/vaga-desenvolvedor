<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProdutoFactory extends Factory
{
    protected $model = \App\Models\Produto::class;

public function definition()
{
    return [
        'titulo' => $this->faker->word(),
        'preco' => $this->faker->randomFloat(2, 10, 500),
        'estoque' => $this->faker->numberBetween(0, 100),
    ];
}
}
