<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CorsApiTest extends TestCase
{
    use RefreshDatabase;

    private function chamar(string $origem)
    {
        $usuario = User::factory()->create(['password' => 'senha1234']);

        return $this->withBasicAuth($usuario->email, 'senha1234')
            ->getJson('/api/clientes', ['Origin' => $origem]);
    }

    public function test_origem_externa_nao_recebe_header_por_padrao(): void
    {
        $this->chamar('http://exemplo.com')
            ->assertOk()
            ->assertHeaderMissing('Access-Control-Allow-Origin');
    }

    public function test_origem_configurada_recebe_header(): void
    {
        config(['cors.allowed_origins' => ['http://exemplo.com']]);

        $this->chamar('http://exemplo.com')
            ->assertOk()
            ->assertHeader('Access-Control-Allow-Origin', 'http://exemplo.com');
    }

    public function test_outra_origem_nao_recebe_header(): void
    {
        config(['cors.allowed_origins' => ['http://exemplo.com']]);

        $resposta = $this->chamar('http://outro.com')->assertOk();

        $this->assertNotSame('http://outro.com', $resposta->headers->get('Access-Control-Allow-Origin'));
    }
}
