<?php

namespace Tests\Feature;

use App\Models\Candidato;
use App\Models\Vaga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VagaCascadeTest extends TestCase
{
    use RefreshDatabase;

    #[\PHPUnit\Framework\Attributes\Test]
    public function ao_excluir_vaga_os_vinculos_pivot_sao_removidos()
    {
        $vaga = Vaga::factory()->create(['status' => 'ativa']);
        $cand = Candidato::factory()->create();

        $cand->vagas()->sync([$vaga->id]);
        $this->assertDatabaseHas('candidato_vaga', [
            'candidato_id' => $cand->id,
            'vaga_id'      => $vaga->id,
        ]);

        $this->deleteJson("/api/vagas/{$vaga->id}")->assertNoContent(); // seu controller retorna 204

        $this->assertDatabaseMissing('candidato_vaga', [
            'candidato_id' => $cand->id,
            'vaga_id'      => $vaga->id,
        ]);
    }
}
