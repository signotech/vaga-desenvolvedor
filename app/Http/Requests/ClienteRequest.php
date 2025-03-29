<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        
        return [
            'nome' => 'required|min:4|max:100',
            'email' => 'required|email|max:255',
            'cpf' => 'required|min:11|max:11'
        ];
    }

    public function messages(): array {

        return [
            'nome.required' => 'O nome é obrigatório.',
            'nome.min' => 'O nome deve ter no mínimo :min caracteres.',
            'nome.max' => 'O nome deve ter no máximo :max caracteres.',

            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'O e-mail deve ser válido.',
            'email.max' => 'O e-mail deve ter no máximo :max caracteres.',

            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.min' => 'O CPF deve ter no mínimo :min caracteres.',
            'cpf.max' => 'O CPF deve ter no máximo :max caracteres.',
        ];
    }

    public function prepareForValidation() {

        $this->merge([
            'nome' => trim($this->nome),
            'email' => trim($this->email),
            'cpf' => trim($this->cpf),
        ]);
    }
}
