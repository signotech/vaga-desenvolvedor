<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class CandidaturaTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_tela_de_candidaturas_renderiza()
    {
        $user = User::factory()->has(Vaga::factory()->count(3))->create();
        $response = $this->actingAs($user)->get('/candidaturas');
        $response->assertStatus(200);
    }

    public function test_tela_de_candidaturas_mostra_todas_as_candidaturas() {
        $user = User::factory()->has(Vaga::factory()->count(3))->create();
        $response = $this->actingAs($user)->get('/candidaturas');
        foreach ($user->vagas as $vaga) {
            $response->assertSee($vaga->nome);
        }
    }

    public function test_candidato_pode_se_candidatar() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->post('/candidaturas', ['vaga_id' => $vaga->id]);
        $this->assertDatabaseHas('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
    }

    public function test_candidato_pode_se_descandidatar() {
        $user = User::factory()->has(Vaga::factory()->count(3))->create();
        foreach ($user->vagas as $vaga) {
            $this->assertDatabaseHas('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
        }
        foreach ($user->vagas as $vaga) {
            $response = $this->actingAs($user)->delete('/candidaturas/'.$vaga->id);
            $this->assertDatabaseMissing('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
        }
    }
}
