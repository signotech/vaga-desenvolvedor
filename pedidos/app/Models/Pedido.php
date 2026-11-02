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

    public const ORDENAVEIS = ['id', 'data_pedido', 'status', 'cliente', 'desconto', 'total'];

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

    // total calculado na query: soma dos itens com o desconto percentual aplicado
    private const TOTAL_SQL = '(coalesce((select sum(item_pedidos.quantidade * item_pedidos.preco_unitario) from item_pedidos where item_pedidos.pedido_id = pedidos.id), 0) * (1 - pedidos.desconto / 100.0))';

    // filtros e ordenação da listagem; o nome do cliente vem no campo "cliente"
    public function scopeListar(Builder $query, Request $request): Builder
    {
        $query->join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
            ->select('pedidos.*', 'clientes.nome as cliente')
            ->selectRaw('round(' . self::TOTAL_SQL . ', 2) as total_calculado')
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
        if ($request->filled('desconto')) {
            is_numeric($request->input('desconto'))
                ? $query->where('pedidos.desconto', (float) $request->input('desconto'))
                : $query->whereRaw('1 = 0');
        }
        if ($request->filled('total')) {
            is_numeric($request->input('total'))
                ? $query->whereRaw('abs(' . self::TOTAL_SQL . ' - ?) < 0.005', [(float) $request->input('total')])
                : $query->whereRaw('1 = 0');
        }

        $ordem = in_array($request->input('ordem'), self::ORDENAVEIS) ? $request->input('ordem') : 'id';
        $coluna = match ($ordem) {
            'cliente' => 'clientes.nome',
            'total' => 'total_calculado',
            default => "pedidos.$ordem",
        };
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
