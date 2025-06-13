<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new UserService();
    }

    /** @test */
    public function pode_listar_todos_os_usuarios()
    {
        User::factory()->count(3)->create();

        $usuarios = $this->service->all();

        $this->assertCount(3, $usuarios);
    }

    /** @test */
    public function pode_buscar_um_usuario_por_id()
    {
        $user = User::factory()->create();

        $result = $this->service->find($user->id);

        $this->assertEquals($user->id, $result->id);
    }

    /** @test */
    public function pode_criar_um_usuario()
    {
        $dados = [
            'name' => 'Mateus',
            'email' => 'mateus@example.com',
            'password' => bcrypt('senha123'),
            'user_type' => 1
        ];

        $user = $this->service->create($dados);

        $this->assertDatabaseHas('users', [
            'email' => 'mateus@example.com'
        ]);
    }

    /** @test */
    public function pode_atualizar_um_usuario()
    {
        $user = User::factory()->create([
            'name' => 'Antigo Nome'
        ]);

        $dados = ['name' => 'Novo Nome'];

        $this->service->update($user->id, $dados);

        $this->assertDatabaseHas('users', ['name' => 'Novo Nome']);
    }

    /** @test */
    public function pode_deletar_um_usuario()
    {
        $user = User::factory()->create();

        $this->service->delete($user->id);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
