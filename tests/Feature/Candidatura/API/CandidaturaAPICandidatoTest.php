<?php

namespace Tests\Feature\Candidatura\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class CandidaturaAPICandidatoTest extends TestCase
{
    public function test_candidato_pode_se_candidatar_pela_api() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->post('/api/candidaturas', ['vaga_id' => $vaga->id]);
        $response->assertJson($user->vagas->toArray());
        $this->assertDatabaseHas('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
    }

    public function test_candidato_pode_se_descandidatar_pela_api() {
        $user = User::factory()->has(Vaga::factory()->count(3))->create();
        foreach ($user->vagas as $vaga) {
            $this->assertDatabaseHas('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
        }
        foreach ($user->vagas as $vaga) {
            $response = $this->actingAs($user)->delete('/api//vagas/candidaturas'.$vaga->id);
            $json = $vaga->toArray();
            unset($json['pivot']);
            $response->assertJson($json);
            $this->assertDatabaseMissing('user_vaga', ['user_id' => $user->id, 'vaga_id' => $vaga->id]);
        }
    }
}
