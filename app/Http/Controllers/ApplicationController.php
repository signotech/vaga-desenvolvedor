<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ApplicationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'position_id' => 'require | exists:postion_id',
        ]);

        $user_id = Auth::id();
        $position_id = $request->input('position_id');

        $applyedSent = DB::table('applications')
        ->where('user_id', $user_id)
        ->where('position_id', $position_id)
        ->exists();

        if (!$applyedSent) {
            DB::table('positions')->insert([
                'user_id' => $user_id,  
                "postion_id" => $position_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return redirect()->back()->with('status', 'application-sent');
    }   
}
