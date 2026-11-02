<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProdutoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sku' => ['required', 'string', 'max:100', Rule::unique('produtos', 'sku')->ignore($this->route('produto'))],
            'titulo' => ['required', 'string', 'max:100'],
            'preco' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
            'estoque' => ['required', 'integer', 'min:0'],
        ];
    }
}
