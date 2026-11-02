<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Pedido extends Model
{
    use HasFactory;

    public const STATUS = ['Em Aberto', 'Pago', 'Cancelado'];

    public const ORDENAVEIS = ['id', 'data_pedido', 'status', 'cliente'];

    protected $fillable = ['cliente_id', 'data_pedido', 'status', 'desconto'];

    protected $casts = ['data_pedido' => 'datetime'];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function itens(): HasMany
    {
        return $this->hasMany(ItemPedido::class);
    }

    // filtros e ordenação da listagem; o nome do cliente vem no campo "cliente"
    public function scopeListar(Builder $query, Request $request): Builder
    {
        $query->join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
            ->select('pedidos.*', 'clientes.nome as cliente')
            ->with('itens');

        if ($request->filled('id')) {
            $query->where('pedidos.id', $request->input('id'));
        }
        if ($request->filled('cliente')) {
            $query->where('clientes.nome', 'like', '%' . $request->input('cliente') . '%');
        }
        if ($request->filled('data_pedido')) {
            $query->whereDate('pedidos.data_pedido', $request->input('data_pedido'));
        }
        if ($request->filled('status')) {
            $query->where('pedidos.status', $request->input('status'));
        }

        $ordem = in_array($request->input('ordem'), self::ORDENAVEIS) ? $request->input('ordem') : 'id';
        $coluna = $ordem === 'cliente' ? 'clientes.nome' : "pedidos.$ordem";
        $direcao = $request->input('direcao') === 'desc' ? 'desc' : 'asc';

        return $query->orderBy($coluna, $direcao);
    }

    public function getSubtotalAttribute(): float
    {
        return $this->itens->sum(fn ($item) => $item->quantidade * $item->preco_unitario);
    }

    // desconto é um percentual de 0 a 100 sobre o subtotal dos itens
    public function getTotalAttribute(): float
    {
        return round($this->subtotal * (1 - $this->desconto / 100), 2);
    }
}
