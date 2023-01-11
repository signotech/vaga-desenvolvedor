<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVagaRequest;
use App\Http\Requests\UpdateVagaRequest;
use App\Models\Vaga;
use Inertia\Inertia;

class VagaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        $vagas = Vaga::all()->map(function ($vaga) use ($user) {
            return ['candidatado' => $user->vagas()->where('vaga_id', $vaga['id'])->exists(), ...$vaga->toArray()];
        });
        return Inertia::render('Vaga/Index', ['vagas' => $vagas]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Vaga/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVagaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVagaRequest $request)
    {
        
        Vaga::create($request->validated());
        return redirect()->route('vagas.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function show(Vaga $vaga)
    {
        return Inertia::render('Vaga/Show', ['vaga' => $vaga]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function edit(Vaga $vaga)
    {
        return Inertia::render('Vaga/Edit', ['vaga' => $vaga]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateVagaRequest  $request
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVagaRequest $request, Vaga $vaga)
    {
        $vaga->update($request->validated());
        return redirect()->route('vagas.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        return redirect()->route('vagas.index');
    }
}
