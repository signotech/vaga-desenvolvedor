<?php

namespace App\Http\Requests;

use App\Models\Pedido;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PedidoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cliente_id' => ['required', 'exists:clientes,id'],
            'data_pedido' => ['required', 'date'],
            'status' => ['required', Rule::in(Pedido::STATUS)],
            'desconto' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'itens' => ['required', 'array', 'min:1'],
            'itens.*.produto_id' => ['required', 'exists:produtos,id'],
            'itens.*.quantidade' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return ['itens.required' => 'Adicione ao menos um produto ao pedido.'];
    }
}
