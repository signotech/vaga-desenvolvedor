<?php

namespace App\Models\Concerns;

// o model define $vinculo com o nome da relação que impede a exclusão
trait ExcluiSemVinculos
{
    public function temVinculos(): bool
    {
        return $this->{static::$vinculo}()->exists();
    }

    // exclui os que não têm vínculos; retorna [excluídos, ignorados]
    public static function excluirSemVinculos(array $ids): array
    {
        $vinculados = static::whereIn('id', $ids)->whereHas(static::$vinculo)->pluck('id');
        $excluidos = static::whereIn('id', $ids)->whereNotIn('id', $vinculados)->delete();

        return [$excluidos, $vinculados->count()];
    }
}
