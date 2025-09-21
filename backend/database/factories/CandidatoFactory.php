<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CandidatoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome'  => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}
