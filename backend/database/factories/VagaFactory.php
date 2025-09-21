<?php

namespace Database\Factories;

use App\Models\Vaga;
use Illuminate\Database\Eloquent\Factories\Factory;

class VagaFactory extends Factory
{
    protected $model = Vaga::class;

    public function definition(): array
    {
        return [
            'titulo' => $this->faker->jobTitle(),
            'tipo'   => $this->faker->randomElement(['CLT','PJ','Freelancer']),
            'status' => $this->faker->randomElement(['ativa','pausada']),
        ];
    }
}
