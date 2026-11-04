<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array {
        return ['sku' => strtoupper(fake()->unique()->bothify('SKU-####??')), 'title' => fake()->words(3, true), 'description' => fake()->sentence(), 'price' => fake()->randomFloat(2, 5, 2500), 'stock' => fake()->numberBetween(0, 200)];
    }
}
