<?php

namespace Tests\Feature\Vaga\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Vaga;
use App\Models\User;

class VagaAPITest extends TestCase
{
    public function test_api_retorna_vagas() {
        $user = User::factory()->create();
        Vaga::factory(5)->create();
        $response = $this->actingAs($user)->get('/api/vagas');
        $response->assertStatus(200);
        $response->assertJson(Vaga::all()->toArray());
    }

    public function test_api_retorna_vaga() {
        $user = User::factory()->create();
        $vaga = Vaga::factory()->create();
        $response = $this->actingAs($user)->get('/api/vagas/'.$vaga->id);
        $response->assertStatus(200);
        $response->assertJson($vaga->toArray());
    }
}
