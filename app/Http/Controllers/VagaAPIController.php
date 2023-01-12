<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use App\Http\Requests\StoreVagaRequest;
use App\Http\Requests\UpdateVagaRequest;

class VagaAPIController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Vaga::class, 'vaga');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Vaga::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVagaRequest $request)
    {
        $vaga = Vaga::create($request->validated());
        return $vaga;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function show(Vaga $vaga)
    {
        return $vaga;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vaga  $vaga
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVagaRequest $request, Vaga $vaga)
    {
        $vaga->update($request->validated());
        return $vaga;
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
        return $vaga;
    }
}
