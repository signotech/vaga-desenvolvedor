<?php

namespace Tests\Feature\Vaga;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class VagaEmpresaTeste extends TestCase
{
    public function test_tela_de_criacao_de_vagas_renderiza_para_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $response = $this->actingAs($user)->get('/vagas/create');
        $response->assertStatus(200);
    }

    public function test_novas_vagas_podem_ser_criadas_por_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->make();
        $response = $this->actingAs($user)->post('/vagas', $vaga->toArray());

        $this->assertDatabaseHas('vagas', $vaga->toArray());
    }

    public function test_tela_de_edicao_de_vagas_renderiza_para_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->get('/vagas/'.$vaga->id.'/edit');
        $response->assertStatus(200);
    }

    public function test_vagas_podem_ser_alteradas_por_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $vaga->nome = 'Vaga Teste Editada';
        $response = $this->actingAs($user)->patch('/vagas/'.$vaga->id, $vaga->toArray());
        $this->assertDatabaseHas('vagas', ['nome' => $vaga->nome]);
    }

    public function test_vagas_podem_ser_deletadas_por_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->delete('/vagas/'.$vaga->id);
        $this->assertModelMissing($vaga);
    }

    public function test_empresas_podem_pausar_vagas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $vaga->pausada = true;
        $response = $this->actingAs($user)->put('/vagas/'.$vaga->id, $vaga->toArray());
        $this->assertDatabaseHas('vagas', ['id' => $vaga->id, 'pausada' => true]);
    }
}
