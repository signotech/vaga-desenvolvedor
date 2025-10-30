<?php

namespace Database\Seeders;

use App\Models\Candidato;
use App\Models\Vaga;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Criar 20 Vagas
        $vagas = Vaga::factory(20)->create();

        // 2. Criar 100 Candidatos
        $candidatos = Candidato::factory(100)->create();

        // 3. Lógica para inscrever candidatos em vagas
        // Vamos iterar sobre cada candidato e inscrevê-lo em algumas vagas
        $vagasIds = $vagas->pluck('id'); // Pega todos os IDs das vagas criadas

        foreach ($candidatos as $candidato) {
            // Para cada candidato, pegue de 1 a 5 IDs de vagas aleatórias
            $vagasParaInscricao = $vagasIds->random(rand(1, 5));
            
            // Anexa (inscreve) o candidato a estas vagas na tabela pivot
            $candidato->vagas()->attach($vagasParaInscricao, ['created_at' => now(), 'updated_at' => now()]);
        }
    }
}