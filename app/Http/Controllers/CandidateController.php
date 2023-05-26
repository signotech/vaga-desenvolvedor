<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CandidateController extends Controller
{

    public function index()
    {
        return view(
            'candidates.index',
            [
                'candidates' => User::where('role', 'candidate')->filter(request(['tag', 'search']))->paginate(6)
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $candidate)
    {
        return view(
            'candidates.show',
            [
                'candidate' => $candidate
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $candidate)
    {
        return view('candidates.edit', ['candidate' => $candidate]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $candidate)
    {
        $formFields = $request->validate([
            'name' => 'required',
            'email' => ['required', 'email']
        ]);

        $candidate->update($formFields);

        return redirect('/candidates')->with('message', 'Candidato atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $candidate)
    {
        $candidate->delete();
        return redirect('/candidates')->with('message', 'Candidato excluido com sucesso');
    }
}
