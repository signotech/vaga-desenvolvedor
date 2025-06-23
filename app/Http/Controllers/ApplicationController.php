<?php

namespace App\Http\Controllers;
use App\Filters\ApplicationFilter;

use App\Models\Position;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;

class ApplicationController extends Controller
{
    public function index(Request $request): View
    {
        $user = Auth::user();

        if (!in_array($user->role, ['admin', 'moderator'])) {
            abort(403, 'Acesso negado.');
        }

        $query = Position::whereHas('candidates')
            ->with('candidates');

        $query = (new ApplicationFilter())->filter($request, $query);

        $positions = $query->paginate(10);

        return view('applications.index', compact('positions'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'position_id' => 'required|exists:positions,id',
        ]);

        $user_id = Auth::id();
        $position_id = $request->input('position_id');

        $applyedSent = DB::table('applications')
        ->where('user_id', $user_id)
        ->where('position_id', $position_id)
        ->exists();

        if (!$applyedSent) {
            DB::table('applications')->insert([
                'user_id' => $user_id,  
                "position_id" => $position_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return redirect()->back()->with('status', 'application-sent');
    }   
}
