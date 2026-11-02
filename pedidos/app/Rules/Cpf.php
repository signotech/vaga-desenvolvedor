<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Cpf implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! self::valido((string) $value)) {
            $fail('O CPF informado é inválido.');
        }
    }

    public static function valido(string $cpf): bool
    {
        if (! preg_match('/^\d{11}$/', $cpf) || preg_match('/^(\d)\1{10}$/', $cpf)) {
            return false;
        }

        foreach ([9, 10] as $tamanho) {
            $soma = 0;
            for ($i = 0; $i < $tamanho; $i++) {
                $soma += (int) $cpf[$i] * ($tamanho + 1 - $i);
            }

            $digito = ($soma * 10) % 11 % 10;

            if ($digito !== (int) $cpf[$tamanho]) {
                return false;
            }
        }

        return true;
    }
}
