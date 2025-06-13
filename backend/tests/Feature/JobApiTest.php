<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApiTest extends TestCase
{
    use RefreshDatabase;

    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        // Cria um usuário do tipo "admin"
        $user = User::factory()->create([
            'user_type' => 2,
            'password' => bcrypt('password'),
        ]);

        // Autentica e salva o token
        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->token = $response['token'];
    }

    public function test_create_job()
    {
        $payload = [
            'title' => 'Vaga Backend',
            'salary' => 5000,
            'company' => 'OpenTech',
            'type' => 'CLT',
            'paused' => false,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
                         ->postJson('/api/jobs', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Vaga Backend']);
    }

    public function test_get_job()
    {
        $job = Job::factory()->create();

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
                         ->getJson("/api/jobs/{$job->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['id' => $job->id]);
    }

    public function test_update_job()
    {
        $job = Job::factory()->create();

        $payload = [
            'title' => 'Atualizado',
            'salary' => 6000,
            'company' => 'NovaEmpresa',
            'type' => 'PJ',
            'paused' => true,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
                         ->putJson("/api/jobs/{$job->id}", $payload);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Atualizado']);
    }

    public function test_delete_job()
    {
        $job = Job::factory()->create();

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
                         ->deleteJson("/api/jobs/{$job->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Job deleted.']);
    }
}
