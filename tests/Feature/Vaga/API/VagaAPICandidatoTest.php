<?php

namespace Tests\Feature\Vaga\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class VagaAPICandidatoTest extends TestCase
{
    public function test_novas_vagas_não_podem_ser_criadas_por_candidatos_pela_api() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->make();
        $response = $this->actingAs($user)->post('/api/vagas', $vaga->toArray());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', $vaga->toArray());
    }

    public function test_vagas_não_podem_ser_alteradas_por_candidatos_pela_api() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $vaga->nome = 'Vaga Teste Editada Pelo Candidato Pela API';
        $response = $this->actingAs($user)->patch('/api/vagas/'.$vaga->id, $vaga->toArray());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', ['nome' => $vaga->nome]);
    }

    public function test_vagas_não_podem_ser_deletadas_por_candidatos_pela_api() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->delete('/api/vagas/'.$vaga->id);

        $response->assertStatus(403);
        $this->assertModelExists($vaga);
    }
}
