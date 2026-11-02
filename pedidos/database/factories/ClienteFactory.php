<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'cpf' => fake()->unique()->cpf(false),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
