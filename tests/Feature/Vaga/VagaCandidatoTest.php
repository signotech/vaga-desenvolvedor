<?php

namespace Tests\Feature\Vaga;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class VagaCandidatoTeste extends TestCase
{
    public function test_tela_de_criacao_de_vagas_não_renderiza_para_candidatos() {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/vagas/create');
        $response->assertStatus(403);
    }

    public function test_novas_vagas_não_podem_ser_criadas_por_candidatos() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->make();
        $response = $this->actingAs($user)->post('/vagas', $vaga->toArray());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', $vaga->toArray());
    }

    public function test_tela_de_edicao_de_vagas_não_renderiza_para_candidatos() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->get('/vagas/'.$vaga->id.'/edit');
        $response->assertStatus(403);
    }

    public function test_vagas_não_podem_ser_alteradas_por_candidatos() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $vaga->nome = 'Vaga Teste Editada';
        $response = $this->actingAs($user)->patch('/vagas/'.$vaga->id, $vaga->toArray());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', ['id' => $vaga->id, 'nome' => $vaga->nome]);
    }

    public function test_vagas_não_podem_ser_deletadas_por_candidatos() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->delete('/vagas/'.$vaga->id);

        $response->assertStatus(403);
        $this->assertModelExists($vaga);
    }
}
