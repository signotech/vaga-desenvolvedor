<?php

namespace App\Http\Requests;

use App\Rules\Cpf;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClienteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['cpf' => preg_replace('/\D/', '', (string) $this->cpf)]);
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:150'],
            'cpf' => ['required', new Cpf, Rule::unique('clientes', 'cpf')->ignore($this->route('cliente'))],
            'email' => ['required', 'email', 'max:255'],
        ];
    }
}
