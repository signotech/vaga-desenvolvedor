<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vaga>
 */

class VagaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    private static $empresa_padrao_id;

    private static function getEmpresaPadrao() {
        if (self::$empresa_padrao_id == null) {
            self::$empresa_padrao_id = User::factory()->create(['role' => 'empresa'])->id;
        }
        return self::$empresa_padrao_id;
    }

    public function definition()
    {
        return [
            'nome' => fake()->catchPhrase(),
            'descricao' => fake()->text(),
            'tipo' => 'PJ',
            'user_id' => self::getEmpresaPadrao(),
            'pausada' => false,
        ];
    }
}
