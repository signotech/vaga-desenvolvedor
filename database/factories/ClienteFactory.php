<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cliente;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

public function definition()
{
    return [
        'nome' => $this->faker->name(),
        'email' => $this->faker->unique()->safeEmail(),
        'cpf' => $this->faker->numerify('###########'),
        'telefone' => $this->faker->phoneNumber(),
    ];
}
}
