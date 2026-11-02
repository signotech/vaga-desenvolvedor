<?php

namespace App\Models;

use App\Models\Concerns\Listavel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produto extends Model
{
    use HasFactory, Listavel;

    protected $fillable = ['sku', 'titulo', 'preco', 'estoque'];

    public function itens(): HasMany
    {
        return $this->hasMany(ItemPedido::class);
    }

    // exclui os que não têm itens; retorna [excluídos, ignorados]
    public static function excluirSemVinculos(array $ids): array
    {
        $vinculados = static::whereIn('id', $ids)->whereHas('itens')->pluck('id');
        $excluidos = static::whereIn('id', $ids)->whereNotIn('id', $vinculados)->delete();

        return [$excluidos, $vinculados->count()];
    }
}
