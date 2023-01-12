<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidaturaRequest;
use App\Models\Vaga;
use Inertia\Inertia;

class CandidaturaController extends Controller
{
    public function __construct() {
        $this->middleware('role:candidato');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('Candidatura/Index', ['vagas' => $user->vagas]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCandidaturaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCandidaturaRequest $request)
    {
        $user = auth()->user();
        $user->vagas()->syncWithoutDetaching([$request->validated()['vaga_id']]);
        return redirect()->route('candidaturas.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Candidatura  $candidatura
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaga $vaga)
    {
        $user = auth()->user();
        $user->vagas()->detach($vaga->id);
        return redirect()->route('candidaturas.index');
    }
}
