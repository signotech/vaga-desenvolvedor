<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_user()
    {
        $payload = [
            'name' => 'Teste',
            'email' => 'teste@example.com',
            'password' => 'secret123',
            'password_confirmation' => 'secret123',
        ];

        $response = $this->postJson('/api/users', $payload);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'user' => ['id', 'name', 'email', 'user_type'],
                     'token'
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'teste@example.com',
            'user_type' => 1,
        ]);
    }

    public function test_login_and_access_protected_route()
    {
        $user = User::factory()->create([
            'password' => bcrypt('secret123'),
            'user_type' => 1,
        ]);

        // login
        $loginResponse = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'secret123',
        ]);

        $loginResponse->assertStatus(200)
                      ->assertJsonStructure(['token']);

        $token = $loginResponse->json('token');

        // acessar rota protegida
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson('/api/me');

        $response->assertStatus(200)
                 ->assertJson([
                     'email' => $user->email,
                 ]);
    }

    public function test_access_protected_route_without_token()
    {
        $response = $this->getJson('/api/me');
        $response->assertStatus(401); // unauthorized
    }
}
