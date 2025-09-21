<?php

namespace Tests\Feature;

use App\Models\Candidato;
use App\Models\Vaga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CandidatoApiTest extends TestCase
{
    use RefreshDatabase;

   #[\PHPUnit\Framework\Attributes\Test]
    public function store_exige_pelo_menos_uma_vaga_ativa_e_recusa_pausada()
    {
        $vagaAtiva   = Vaga::factory()->create(['status' => 'ativa']);
        $vagaPausada = Vaga::factory()->create(['status' => 'pausada']);

        $res1 = $this->postJson('/api/candidatos', [
            'nome'  => 'Ana',
            'email' => 'ana@example.com',
        ]);
        $res1->assertStatus(422)->assertJsonValidationErrors(['vaga_ids']);

        $res2 = $this->postJson('/api/candidatos', [
            'nome'     => 'Bruno',
            'email'    => 'bruno@example.com',
            'vaga_ids' => [$vagaPausada->id],
        ]);
        $res2->assertStatus(422);

        $res3 = $this->postJson('/api/candidatos', [
            'nome'     => 'Carla',
            'email'    => 'carla@example.com',
            'vaga_ids' => [$vagaAtiva->id],
        ]);
        $res3->assertCreated()
             ->assertJsonFragment(['nome' => 'Carla', 'email' => 'carla@example.com']);

        $candId = $res3->json('id') ?? $res3->json('data.id') ?? Candidato::whereEmail('carla@example.com')->value('id');
        $this->assertDatabaseHas('candidato_vaga', [
            'candidato_id' => $candId,
            'vaga_id'      => $vagaAtiva->id,
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function update_se_enviar_vaga_ids_exige_pelo_menos_uma_ativa_e_sincroniza()
    {
        $ativa1 = Vaga::factory()->create(['status' => 'ativa']);
        $ativa2 = Vaga::factory()->create(['status' => 'ativa']);
        $cand   = Candidato::factory()->create([
            'nome'  => 'Dan',
            'email' => 'dan@example.com',
        ]);
        $cand->vagas()->sync([$ativa1->id]);

        $res1 = $this->putJson("/api/candidatos/{$cand->id}", [
            'vaga_ids' => [],
        ]);
        $res1->assertStatus(422)->assertJsonValidationErrors(['vaga_ids']);

        $res2 = $this->putJson("/api/candidatos/{$cand->id}", [
            'vaga_ids' => [$ativa2->id],
        ]);
        $res2->assertOk();

        $this->assertDatabaseMissing('candidato_vaga', [
            'candidato_id' => $cand->id,
            'vaga_id'      => $ativa1->id,
        ]);
        $this->assertDatabaseHas('candidato_vaga', [
            'candidato_id' => $cand->id,
            'vaga_id'      => $ativa2->id,
        ]);
    }
}
