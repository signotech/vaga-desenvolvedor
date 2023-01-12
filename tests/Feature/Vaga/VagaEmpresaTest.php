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
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->get('/vagas/'.$vaga->id.'/edit');
        $response->assertStatus(200);
    }

    public function test_tela_de_edicao_de_vagas_não_renderiza_para_outras_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->get('/vagas/'.$vaga->id.'/edit');
        $response->assertStatus(403);
    }

    public function test_vagas_podem_ser_alteradas_por_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $vaga->nome = 'Vaga Teste Editada';
        $response = $this->actingAs($user)->patch('/vagas/'.$vaga->id, $vaga->toArray());
        $this->assertDatabaseHas('vagas', ['id' => $vaga->id, 'nome' => $vaga->nome]);
    }

    public function test_vagas_nao_podem_ser_alteradas_por_outras_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $vaga->nome = 'Vaga Teste Editada';
        $response = $this->actingAs($user)->patch('/vagas/'.$vaga->id, $vaga->toArray());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', ['id' => $vaga->id, 'nome' => $vaga->nome]);
    }

    public function test_vagas_podem_ser_deletadas_por_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->delete('/vagas/'.$vaga->id);
        $this->assertModelMissing($vaga);
    }

    public function test_vagas_não_podem_ser_deletadas_por_outras_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->delete('/vagas/'.$vaga->id);
        $response->assertStatus(403);
        $this->assertModelExists($vaga);
    }

    public function test_empresas_podem_pausar_vagas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $vaga->pausada = true;
        $response = $this->actingAs($user)->put('/vagas/'.$vaga->id, $vaga->toArray());
        $this->assertDatabaseHas('vagas', ['id' => $vaga->id, 'pausada' => true]);
    }

    public function test_empresas_podem_pausar_vagas_de_outras_empresas() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $vaga->pausada = true;
        $response = $this->actingAs($user)->put('/vagas/'.$vaga->id, $vaga->toArray());
        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', ['id' => $vaga->id, 'pausada' => true]);
    }
}
