<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Filters\PositionFilter;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;


class PositionsController extends Controller
{
    public function index(Request $request): View
    {
        $query = Position::query();

        $query = (new PositionFilter())->filter($request, $query);

        if (!Auth::user() || Auth::user()->role === 'user' ) {
            $query->where('status', true);
        }
        
        $positions = $query->paginate(20);

        return view('position.positions', compact('positions'));
    }

    public function create(): View
    {
        $user = Auth::user();

        if (!in_array($user->role,['admin', 'moderator'])) {
            abort(403, 'Acesso negado.');
        }

        return view('position.create');
    }
    
    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();

        if (!in_array($user->role, ['admin', 'moderator'])) {
            abort(403, 'Acesso negado.');
        }
        
       $validade = $request->validate([
            'title' => 'required|string',
            'contract' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'status' => 'required|boolean', 
        ]);
        
        Position::create($validade);

        return redirect()->route('positions.index')->with('status', 'created');
    }

    public function edit(Position $position): View
    {
        $user = Auth::user();

        if (!in_array($user->role, ['admin', 'moderator'])) {
            abort(403, 'Acesso negado.');
        }
        return view('position.edit', compact('position'));
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $position = Position::findOrfail($id);

        $validade = $request->validate([
            'title' => 'required|string',
            'contract' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'status' => 'required|boolean', 
        ]);

        $position->update($validade);

        return redirect()->route('positions.index')->with('status', 'updated');
    }

    public function destroy(Position $position): RedirectResponse
    {
        $position->delete();
        return redirect()->route('positions.index')->with('status', 'deleted');
    }
}
