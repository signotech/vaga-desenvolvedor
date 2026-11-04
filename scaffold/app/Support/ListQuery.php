<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait ListQuery
{
    protected function applyListQuery(Builder $query, Request $request, array $allowed): Builder
    {
        foreach ($allowed as $column) {
            $value = $request->query($column);
            if ($value !== null && $value !== '') {
                $query->where($column, 'like', '%'.str_replace(['%', '_'], ['\\%', '\\_'], $value).'%');
            }
        }

        $sort = $request->query('sort', 'id');
        $direction = strtolower($request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc';

        if (in_array($sort, $allowed, true) || $sort === 'id') {
            $query->orderBy($sort, $direction);
        }

        return $query;
    }

    protected function pageSize(Request $request): int
    {
        $perPage = (int) $request->query('per_page', 20);
        return in_array($perPage, [10, 20, 50, 100], true) ? $perPage : 20;
    }
}
