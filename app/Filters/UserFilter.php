<?php

namespace App\Filters;

use Illuminate\Http\Request;

Class UserFilter
{

  public function filter(Request $request, $query)
  {
    if ($search = $request->input('search')) {
      $query->where(function($q) use ($search) {
        $q->where('name', 'ilike', "%{$search}%")
          ->orWhere('email', 'ilike', "%{$search}%");
      });
    }

    if ($roles = $request->input('role')) {
      $query->whereIn('role', (array) $roles);
    }

    if ($order = $request->input('order')) {
    [$field, $direction] = explode('_', $order);

      if (in_array($direction, ['asc', 'desc'])) {
          $query->orderBy($field, $direction);
      } else {
          $query->orderBy('name', 'asc');
      }
    } else {
        $query->orderBy('name', 'asc');
    }

    return $query;
  }

}