<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vaga;
use App\Models\Candidato;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Vaga::factory(10)->create();
        Candidato::factory(50)->create()->each(function($candidato) {
            $candidato->vagas()->attach(Vaga::inRandomOrder()->take(rand(1,3))->pluck('id'));
        });
    }
}

