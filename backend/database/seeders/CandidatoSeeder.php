<?php

namespace Database\Seeders;

use App\Models\Candidato;
use App\Models\Vaga;
use Illuminate\Database\Seeder;

class CandidatoSeeder extends Seeder
{
    public function run(): void
    {
        $ativas = Vaga::where('status', 'ativa')->pluck('id');

        if ($ativas->isEmpty()) {
            $ativa = Vaga::factory()->create(['status' => 'ativa']);
            $ativas = collect([$ativa->id]);
        }

        Candidato::factory()
            ->count(20)
            ->create()
            ->each(function (Candidato $c) use ($ativas) {
                $qtd = min(3, $ativas->count());
                $attach = $ativas->shuffle()->take(max(1, $qtd))->values();
                $c->vagas()->syncWithoutDetaching($attach);
            });
    }
}
