<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdutoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'titulo' => $this->titulo,
            'preco' => (float) $this->preco,
            'estoque' => $this->estoque,
        ];
    }
}
