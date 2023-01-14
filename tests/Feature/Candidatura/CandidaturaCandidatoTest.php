<?php

namespace Tests\Feature\Candidatura;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class CandidaturaCandidatoTest extends TestCase
{
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
