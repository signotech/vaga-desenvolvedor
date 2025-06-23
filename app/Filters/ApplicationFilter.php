<?php

namespace App\Filters;

use Illuminate\Http\Request;

Class ApplicationFilter
{

  public function filter(Request $request, $query)
{
    if ($search = $request->input('search')) {
        $query->where(function ($q) use ($search) {
            $q->whereHas('candidates', function ($subQuery) use ($search) {
                $subQuery->where('name', 'ilike', "%{$search}%")
                         ->orWhere('email', 'ilike', "%{$search}%");
            })
            ->orWhere('title', 'ilike', "%{$search}%");
        });
    }

    if ($contracts = $request->input('contract')) {
        $query->whereIn('contract', (array) $contracts);
    }

    if ($types = $request->input('type')) {
        $query->whereIn('type', (array) $types);
    }

    if ($order = $request->input('order')) {
    $parts = explode('_', $order);
    $direction = strtolower(array_pop($parts));
    $field = implode('_', $parts);

    if (!in_array($direction, ['asc', 'desc'])) {
        $direction = 'asc'; 
    }
    if ($field === 'title') {
        $query->orderBy($field, $direction);
    } else {
        $query->orderBy('title', 'asc');
    }
} else {
    $query->orderBy('title', 'asc');
}

    return $query;
  }

}