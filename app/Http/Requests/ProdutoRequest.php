<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdutoRequest extends FormRequest
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
            'titulo' => 'required|min:4|max:255',
            'preco' => 'required|numeric|min:0.01',
            'estoque' => 'required|integer|min:0',
            'codigo_sku' => 'required|min:6|max:16',
        ];
    }

    public function messages(): array {

        return [
            'titulo.required' => 'O título é obrigatório.',
            'titulo.min' => 'O título deve ter no mínimo :min caracteres.',
            'titulo.max' => 'O título deve ter no máximo :max caracteres.',

            'preco.required' => 'O preço é obrigatório.',
            'preco.numeric' => 'O preço deve ser um número.',
            'preco.min' => 'O preço deve ser no mínimo :min.',

            'estoque.required' => 'O estoque é obrigatório.',
            'estoque.integer' => 'O estoque deve ser um número inteiro.',
            'estoque.min' => 'O estoque deve ter no mínimo :min.',

            'codigo_sku.required' => 'O código SKU é obrigatório.',
            'codigo_sku.min' => 'O código SKU deve ter no mínimo :min caracteres.',
            'codigo_sku.max' => 'O código SKU deve ter no máximo :max caracteres.',
        ];
    }

    public function prepareForValidation() {

        $this->merge([
            'titulo' => trim($this->titulo),
            'preco' => trim($this->preco),
            'estoque' => trim($this->estoque),
            'codigo_sku' => trim($this->codigo_sku),
        ]);
    }
}
