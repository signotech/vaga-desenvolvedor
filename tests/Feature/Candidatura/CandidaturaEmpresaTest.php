<?php

namespace Tests\Feature\Candidatura;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class CandidaturaEmpresaTest extends TestCase
{
    public function test_empresa_nao_pode_se_candidatar() {
        $user = User::factory()->create(['role' => 'empresa']);
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->post('/vagas/candidaturas', ['vaga_id' => $vaga->id]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
    }

    public function test_empresa_nao_pode_se_descandidatar() {
        $user = User::factory()->has(Vaga::factory()->count(3))->create(['role' => 'empresa']);
        foreach ($user->vagas as $vaga) {
            $this->assertDatabaseHas('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
        }
        foreach ($user->vagas as $vaga) {
            $response = $this->actingAs($user)->delete('/vagas/candidaturas'.$vaga->id);

            $response->assertStatus(403);
            $this->assertDatabaseHas('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
        }
    }
}
