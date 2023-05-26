<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testCreate()
    {
        $response = $this->get(route('users.create'));

        $response->assertStatus(200);
        $response->assertViewIs('users.register');
    }

    public function testStore()
    {
        $response = $this->post(route('users.store'), [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'candidate',
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $response->assertSessionHas('message', 'Candidato criado e logado com sucesso');

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'role' => 'candidate',
        ]);

        $this->assertAuthenticated();
    }

    public function testLogout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('users.logout'));

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $response->assertSessionHas('message', 'Usuário saiu com sucesso');

        $this->assertGuest();
    }

    public function testLogin()
    {
        $response = $this->get(route('login'));

        $response->assertStatus(200);
        $response->assertViewIs('users.login');
    }

    public function testAuthenticate()
    {
        $user = User::factory()->create(['email' => 'johndoe@example.com', 'password' => bcrypt('password')]);

        $response = $this->post(route('users.authenticate'), [
            'email' => 'johndoe@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $response->assertSessionHas('message', 'Candidato logado com sucesso!');

        $this->assertAuthenticatedAs($user);
    }
}
