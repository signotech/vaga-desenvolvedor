<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ErroApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_erro_404_nao_expoe_trace_com_debug_desligado(): void
    {
        config(['app.debug' => false]);
        User::factory()->create(['email' => 'api@exemplo.com', 'password' => 'senha1234']);

        $this->withHeader('Authorization', 'Basic '.base64_encode('api@exemplo.com:senha1234'))
            ->getJson('/api/pedidos/9999')
            ->assertNotFound()
            ->assertExactJson(['message' => 'Registro não encontrado.']);
    }
}
