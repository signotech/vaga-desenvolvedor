<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    public function definition(): array {
        return ['name' => fake('pt_BR')->name(), 'cpf' => fake()->unique()->numerify('###########'), 'email' => fake()->unique()->safeEmail(), 'phone' => fake()->phoneNumber()];
    }
}
