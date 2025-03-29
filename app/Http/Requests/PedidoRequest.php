<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PedidoRequest extends FormRequest {
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
            'cliente_id' => 'required|exists:clientes,id',
            'produtos' => 'required|array',
            'produtos.*' => 'exists:produtos,id',
            'quantidades' => 'required|array',
            'quantidades.*' => 'integer|min:1',
            'status' => 'in:Em Aberto,Pago,Cancelado',
        ];
    }

    public function messages(): array {

        return [
            'cliente_id.required' => 'Selecione um cliente para o pedido.',
            'cliente_id.exists' => 'O cliente selecionado não existe.',

            'produtos.required' => 'Selecione pelo menos um produto.',
            'produtos.*.exists' => 'Um dos produtos selecionados não existe.',

            'quantidades.required' => 'Informe a quantidade de cada produto.',
            'quantidades.*.integer' => 'A quantidade deve ser um número inteiro.',
            'quantidades.*.min' => 'A quantidade mínima é :min.',
        ];
    }
}
