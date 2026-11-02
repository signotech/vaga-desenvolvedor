<?php

namespace Tests\Unit;

use App\Rules\Cpf;
use PHPUnit\Framework\TestCase;

class CpfTest extends TestCase
{
    public function test_aceita_cpfs_validos(): void
    {
        foreach (['52998224725', '11144477735'] as $cpf) {
            $this->assertTrue(Cpf::valido($cpf));
        }
    }

    public function test_rejeita_digito_verificador_errado(): void
    {
        foreach (['11122233344', '52998224724', '52998224715'] as $cpf) {
            $this->assertFalse(Cpf::valido($cpf));
        }
    }

    public function test_rejeita_sequencias_repetidas_e_tamanho_errado(): void
    {
        foreach (['00000000000', '11111111111', '99999999999', '5299822472', '529982247250', 'abcdefghijk'] as $cpf) {
            $this->assertFalse(Cpf::valido($cpf));
        }
    }

    public function test_regra_devolve_mensagem_em_portugues(): void
    {
        $mensagem = null;
        (new Cpf)->validate('cpf', '11122233344', function ($m) use (&$mensagem) {
            $mensagem = $m;
        });

        $this->assertSame('O CPF informado é inválido.', $mensagem);
    }
}
