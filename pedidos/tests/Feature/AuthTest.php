<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    private function basic(string $email = 'ana@exemplo.com', string $senha = 'senha1234'): array
    {
        return ['Authorization' => 'Basic '.base64_encode("$email:$senha")];
    }

    public function test_login_com_credenciais_validas(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com', 'password' => 'senha1234']);

        $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'senha1234'])
            ->assertRedirect('/pedidos');
        $this->assertAuthenticated();
    }

    public function test_login_invalido(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com', 'password' => 'senha1234']);

        $this->from('/login')->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'errada'])
            ->assertRedirect('/login')
            ->assertSessionHasErrors(['email' => 'E-mail ou senha inválidos.']);
        $this->assertGuest();

        $this->post('/login', [])->assertSessionHasErrors(['email', 'password']);
    }

    public function test_logout(): void
    {
        $this->actingAs(User::factory()->create())->post('/logout')->assertRedirect('/login');
    }

    public function test_cadastro_cria_usuario_e_autentica(): void
    {
        $this->post('/registro', [
            'name' => 'Ana',
            'email' => 'ana@exemplo.com',
            'password' => 'senha1234',
            'password_confirmation' => 'senha1234',
        ])->assertRedirect('/pedidos');

        $this->assertDatabaseHas('users', ['email' => 'ana@exemplo.com']);
        $this->assertAuthenticated();
    }

    public function test_cadastro_valida_campos(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com']);

        $this->post('/registro', [])->assertSessionHasErrors(['name', 'email', 'password']);

        $this->post('/registro', ['name' => 'Ana', 'email' => 'ana@exemplo.com', 'password' => 'senha1234', 'password_confirmation' => 'senha1234'])
            ->assertSessionHasErrors(['email' => 'Já existe um registro com este e-mail.']);

        $this->post('/registro', ['name' => 'Bia', 'email' => 'bia@exemplo.com', 'password' => 'curta', 'password_confirmation' => 'curta'])
            ->assertSessionHasErrors('password');

        $this->post('/registro', ['name' => 'Bia', 'email' => 'bia@exemplo.com', 'password' => 'senha1234', 'password_confirmation' => 'outra1234'])
            ->assertSessionHasErrors('password');
    }

    public function test_rotas_web_exigem_login(): void
    {
        foreach (['/pedidos', '/clientes', '/produtos', '/pedidos/create'] as $rota) {
            $this->get($rota)->assertRedirect('/login');
        }
        $this->delete('/clientes', ['ids' => [1]])->assertRedirect('/login');
    }

    public function test_logado_nao_ve_login_e_raiz_redireciona(): void
    {
        $this->get('/')->assertRedirect('/pedidos');
        $this->actingAs(User::factory()->create())->get('/login')->assertRedirect('/pedidos');
    }

    public function test_nome_do_usuario_aparece_na_barra(): void
    {
        $this->actingAs(User::factory()->create(['name' => 'Maria Teste']))->get('/pedidos')->assertSee('Maria Teste');
    }

    public function test_api_sem_credenciais_retorna_401_json(): void
    {
        $this->getJson('/api/clientes')->assertUnauthorized()->assertJsonStructure(['message']);
        $this->getJson('/api/pedidos', $this->basic())->assertUnauthorized();
    }

    public function test_api_com_basic_retorna_200_sem_criar_sessao(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com', 'password' => 'senha1234']);

        $this->getJson('/api/clientes', $this->basic())->assertOk()->assertCookieMissing(config('session.cookie'));
        $this->getJson('/api/clientes', $this->basic('ana@exemplo.com', 'errada'))->assertUnauthorized();
    }
}
