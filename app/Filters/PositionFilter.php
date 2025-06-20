<?php

namespace App\Filters;

use Illuminate\Http\Request;

Class PositionFilter
{

  public function filter(Request $request, $query)
  {
    if ($search = $request->input('search')) {
      $query->where(function($q) use ($search) {
        $q->where('title', 'ilike', "%{$search}%")
          ->orWhere('contract', 'ilike', "%{$search}%")
          ->orWhere('type', 'ilike', "%{$search}%")
          ->orWhere('description', 'ilike',"%{$search}%")
          ->orWhere('requirements', 'ilike', "%{$search}%");
      });
    }

    if ($contracts = $request->input('contract')) {
      $query->whereIn('contract', (array) $contracts);
    }

    if ($types = $request->input('type')) {
      $query->WhereIn('type', (array) $types);
    }

    if ($order = $request->input('order')) {
    [$field, $direction] = explode('_', $order);

      if (in_array($direction, ['asc', 'desc'])) {
          $query->orderBy($field, $direction);
      } else {
          $query->orderBy('id', 'asc');
      }
    } else {
        $query->orderBy('id', 'asc');
    }

    return $query;
  }

}