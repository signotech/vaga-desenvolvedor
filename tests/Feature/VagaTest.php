<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class VagaTest extends TestCase
{

    public function test_tela_de_vagas_renderiza() {
        $response = $this->get('/vagas');
        $response->assertStatus(200);
    }

    public function test_tela_da_vaga_renderiza() {
        $vaga = Vaga::factory()->create();
        $response = $this->get('/vagas/'.$vaga->id);
        $response->assertStatus(200);
    }

    public function test_tela_de_criacao_de_vagas_renderiza() {
        $response = $this->get('/vagas/create');
        $response->assertStatus(200);
    }

    public function test_novas_vagas_podem_ser_criadas(): void
    {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->make();
        $response = $this->actingAs($user)->post('/vagas', $vaga->toArray());

        $this->assertDatabaseHas('vagas', $vaga->toArray());
    }

    public function test_tela_de_edicao_de_vagas_renderiza() {
        $vaga = Vaga::factory()->create();
        $response = $this->get('/vagas/'.$vaga->id.'/edit');
        $response->assertStatus(200);
    }

    public function test_vagas_podem_ser_alteradas() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $vaga->nome = 'Vaga Teste Editada';
        $response = $this->actingAs($user)->patch('/vagas/'.$vaga->id, $vaga->toArray());
        $this->assertDatabaseHas('vagas', ['nome' => $vaga->nome]);
    }

    public function test_vagas_podem_ser_deletadas() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->delete('/vagas/'.$vaga->id);
        $this->assertModelMissing($vaga);
    }
}
