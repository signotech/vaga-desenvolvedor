<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use App\Http\Requests\StoreCandidaturaRequest;

class CandidaturaAPIController extends Controller
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
        return auth()->user()->vagas;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCandidaturaRequest $request)
    {
        $user = auth()->user();
        $user->vagas()->syncWithoutDetaching([$request->validated()['vaga_id']]);
        return $user->vagas;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaga $vaga)
    {
        $user = auth()->user();
        $user->vagas()->detach($vaga->id);
        return $vaga;
    }
}
