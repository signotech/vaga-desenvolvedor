<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidaturaRequest;
use App\Models\Vaga;
use Illuminate\Http\Request;
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
    public function index(Request $request)
    {
        $user = auth()->user();

        $params = $request->collect();
        $quantidade = isset($params['quantidade']) ? $params['quantidade'] : 20;

        $vagas = $user->vagas();
        $vagas = isset($params['tipo']) ? $vagas->where('tipo', $request->input('tipo')) : $vagas;
        $vagas = isset($params['nome']) ? $vagas->where('nome', 'like', '%'.$request->input('nome').'%') : $vagas;
        $vagas = isset($params['ordenar']) ? $vagas->orderBy($request->input('ordenar')) : $vagas->orderBy('nome');
        $vagas = $vagas->paginate($quantidade);

        return Inertia::render('Candidatura/Index', ['vagas' => $vagas, 'params' => count($params) == 0 ? null : $params]);
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
