<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemPedidoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'produto_id' => $this->produto_id,
            'produto' => new ProdutoResource($this->whenLoaded('produto')),
            'quantidade' => $this->quantidade,
            'preco_unitario' => (float) $this->preco_unitario,
            'subtotal' => round($this->quantidade * $this->preco_unitario, 2),
        ];
    }
}
