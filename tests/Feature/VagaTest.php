<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vaga;

class VagaTest extends TestCase
{

    public function test_tela_de_vagas_renderiza() {
        $response = $this->get('/vagas');
        $response->assertStatus(200);
    }

    public function test_tela_da_vaga_renderiza() {
        $vaga = Vaga::factory()->create();
        $response = $this->get('/vagas/'.$vaga->id);
        $response->assertStatus(200);
    }
}
