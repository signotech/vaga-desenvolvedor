<?php

namespace App\Services;

use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Support\Facades\DB;

class PedidoService
{
    public function criar(array $dados): Pedido
    {
        return DB::transaction(function () use ($dados) {
            $pedido = Pedido::create($this->dadosDoPedido($dados));
            $this->salvarItens($pedido, $dados['itens']);

            return $pedido;
        });
    }

    public function atualizar(Pedido $pedido, array $dados): Pedido
    {
        return DB::transaction(function () use ($pedido, $dados) {
            $pedido->update($this->dadosDoPedido($dados));
            $pedido->itens()->delete();
            $this->salvarItens($pedido, $dados['itens']);

            return $pedido;
        });
    }

    private function dadosDoPedido(array $dados): array
    {
        return [
            'cliente_id' => $dados['cliente_id'],
            'data_pedido' => $dados['data_pedido'],
            'status' => $dados['status'],
        ];
    }

    // o preço unitário é copiado do produto na hora, para não mudar pedidos antigos
    private function salvarItens(Pedido $pedido, array $itens): void
    {
        $produtos = Produto::whereIn('id', collect($itens)->pluck('produto_id'))->get()->keyBy('id');

        foreach ($itens as $item) {
            $pedido->itens()->create([
                'produto_id' => $item['produto_id'],
                'quantidade' => $item['quantidade'],
                'preco_unitario' => $produtos[$item['produto_id']]->preco,
            ]);
        }
    }
}
