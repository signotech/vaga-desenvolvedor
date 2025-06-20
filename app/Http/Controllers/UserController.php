<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Filters\UserFilter;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class UserController extends Controller
{
    public function index(Request $request): View
    {
        $query = User::query();

        $query = (new UserFilter())->filter($request, $query);
        
        $user = Auth::user();

        if (!in_array($user->role, ['admin', 'moderator'])) {
            abort(403, 'Acesso negado.');
        }
        
        $users = $query->paginate(10);
        return view('users.index', compact('users'));
    }    
}
