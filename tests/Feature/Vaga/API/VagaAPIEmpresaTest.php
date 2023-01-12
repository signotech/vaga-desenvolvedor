<?php

namespace Tests\Feature\Vaga\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class VagaAPIEmpresaTest extends TestCase
{
    public function test_novas_vagas_podem_ser_criadas_por_empresas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->make(['user_id' => $user->id]);
        $response = $this->actingAs($user)->post('/api/vagas', $vaga->toArray());

        $response->assertJson($vaga->toArray());
        $this->assertDatabaseHas('vagas', $vaga->toArray());
    }

    public function test_vagas_podem_ser_alteradas_por_empresas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $vaga->nome = 'Vaga Teste Editada Pela Empresa Pela API';
        $response = $this->actingAs($user)->patch('/api/vagas/'.$vaga->id, $vaga->toArray());

        $response->assertJson($vaga->toArray());
        $this->assertDatabaseHas('vagas', ['nome' => $vaga->nome]);
    }

    public function test_vagas_não_podem_ser_alteradas_por_outras_empresas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $vaga->nome = 'Vaga Teste Editada Pela Outra Empresa Pela API';
        $response = $this->actingAs($user)->patch('/api/vagas/'.$vaga->id, $vaga->toArray());

        $response->status(403);
        $this->assertDatabaseMissing('vagas', ['nome' => $vaga->nome]);
    }

    public function test_vagas_podem_ser_deletadas_por_empresas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->delete('/api/vagas/'.$vaga->id);

        $response->assertJson($vaga->toArray());
        $this->assertModelMissing($vaga);
    }

    public function test_vagas_não_podem_ser_deletadas_outras_por_empresas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->delete('/api/vagas/'.$vaga->id);

        $response->assertStatus(403);
        $this->assertModelExists($vaga);
    }

    public function test_empresas_podem_pausar_vagas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create(['user_id' => $user->id]);
        $vaga->pausada = true;
        $response = $this->actingAs($user)->put('/api/vagas/'.$vaga->id, $vaga->toArray());

        $response->assertJson($vaga->toArray());
        $this->assertDatabaseHas('vagas', ['id' => $vaga->id, 'pausada' => true]);
    }

    public function test_empresas_não_podem_pausar_vagas_de_outras_empresas_pela_api() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $vaga->pausada = true;
        $response = $this->actingAs($user)->put('/api/vagas/'.$vaga->id, $vaga->toArray());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('vagas', ['id' => $vaga->id, 'pausada' => true]);
    }
}
