<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cliente_id' => $this->cliente_id,
            // na listagem o atributo "cliente" traz só o nome, por isso o cliente vem da relação carregada
            'cliente' => $this->when($this->resource->relationLoaded('cliente'), fn () => new ClienteResource($this->resource->getRelation('cliente'))),
            'data_pedido' => $this->data_pedido->toIso8601String(),
            'status' => $this->status,
            'itens' => ItemPedidoResource::collection($this->whenLoaded('itens')),
            'subtotal' => round($this->subtotal, 2),
            'desconto' => (float) $this->desconto,
            'total' => $this->total,
        ];
    }
}
