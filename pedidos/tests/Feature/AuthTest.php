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

    private function dadosCadastro(array $extra = []): array
    {
        return $extra + ['name' => 'Bia', 'email' => 'bia@exemplo.com', 'password' => 'senha1234', 'password_confirmation' => 'senha1234'];
    }

    public function test_visitante_no_registro_vai_para_o_login(): void
    {
        $this->get('/registro')->assertRedirect('/login');
        $this->post('/registro', $this->dadosCadastro())->assertRedirect('/login');
        $this->assertDatabaseMissing('users', ['email' => 'bia@exemplo.com']);
    }

    public function test_logado_cria_usuario_e_continua_na_mesma_sessao(): void
    {
        $atual = User::factory()->create();

        $this->actingAs($atual)->get('/registro')->assertOk();
        $this->actingAs($atual)->post('/registro', $this->dadosCadastro())
            ->assertRedirect('/pedidos')
            ->assertSessionHas('ok', 'Usuário criado.');

        $this->assertDatabaseHas('users', ['email' => 'bia@exemplo.com']);
        $this->assertAuthenticatedAs($atual);
    }

    public function test_cadastro_valida_campos(): void
    {
        $this->actingAs(User::factory()->create(['email' => 'ana@exemplo.com']));

        $this->post('/registro', [])->assertSessionHasErrors(['name', 'email', 'password']);

        $this->post('/registro', $this->dadosCadastro(['email' => 'ana@exemplo.com']))
            ->assertSessionHasErrors(['email' => 'Já existe um registro com este e-mail.']);

        $this->post('/registro', $this->dadosCadastro(['password' => 'curta', 'password_confirmation' => 'curta']))
            ->assertSessionHasErrors('password');

        $this->post('/registro', $this->dadosCadastro(['password_confirmation' => 'outra1234']))
            ->assertSessionHasErrors('password');
    }

    public function test_login_limita_tentativas_por_email_e_ip(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com', 'password' => 'senha1234']);

        for ($i = 0; $i < 5; $i++) {
            $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'errada'])->assertRedirect();
        }

        $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'senha1234'])
            ->assertStatus(429)
            ->assertSee('Muitas tentativas. Tente novamente em');
        $this->assertGuest();

        $this->post('/login', ['email' => 'outra@exemplo.com', 'password' => 'errada'])->assertRedirect();
    }

    public function test_login_correto_zera_o_contador(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com', 'password' => 'senha1234']);

        for ($i = 0; $i < 4; $i++) {
            $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'errada']);
        }
        $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'senha1234'])->assertRedirect('/pedidos');
        $this->post('/logout');

        for ($i = 0; $i < 5; $i++) {
            $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'errada'])->assertRedirect();
        }
        $this->post('/login', ['email' => 'ana@exemplo.com', 'password' => 'errada'])->assertStatus(429);
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

    public function test_api_limita_requisicoes_com_429_json(): void
    {
        User::factory()->create(['email' => 'ana@exemplo.com', 'password' => 'senha1234']);

        for ($i = 0; $i < 60; $i++) {
            $this->getJson('/api/clientes', $this->basic());
        }

        $this->getJson('/api/clientes', $this->basic());
        $this->getJson('/api/clientes', $this->basic())->assertStatus(429)->assertJsonStructure(['message']);
    }
}
