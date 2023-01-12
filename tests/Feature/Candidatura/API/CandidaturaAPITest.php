<?php

namespace Tests\Feature\Candidatura\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class CandidaturaAPITest extends TestCase
{
    public function test_api_retorna_candidaturas()
    {
        $user = User::factory()->has(Vaga::factory()->count(3))->create();
        $response = $this->actingAs($user)->get('/api/candidaturas');
        $response->assertStatus(200);
        $response->assertJson($user->vagas->toArray());
    }
}
