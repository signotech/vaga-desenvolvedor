<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class CandidaturaTest extends TestCase
{
    public function test_tela_de_candidaturas_renderiza()
    {
        $user = User::factory()->has(Vaga::factory()->count(3))->create();
        $response = $this->actingAs($user)->get('/candidaturas');
        $response->assertStatus(200);
    }
}
