<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVagaRequest; // Criamos na etapa anterior
use App\Http\Requests\UpdateVagaRequest; // Criamos na etapa anterior

class VagaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(Request $request)
    {
        $query = Vaga::query();

        // Aplicar Filtros
        if ($request->filled('titulo')) {
            $query->where('titulo', 'like', '%' . $request->titulo . '%');
        }
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        // Aplicar Ordenação
        $sort_by = $request->get('sort_by', 'created_at');
        $sort_dir = $request->get('sort_dir', 'desc');
        $query->orderBy($sort_by, $sort_dir);

        $perPage = $request->get('per_page', 20);

        // Paginação
        $vagas = $query->paginate($perPage)->withQueryString(); // withQueryString mantém filtros/ordem na URL

        return view('vagas.index', compact('vagas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('vagas.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(StoreVagaRequest $request)
    {
        Vaga::create($request->validated());
        return redirect()->route('vagas.index')->with('success', 'Vaga criada com sucesso.');
    }

    /**
     * Display the specified resource.
     * (Não é estritamente necessário para o CRUD, mas bom ter)
     */
    public function show(Vaga $vaga)
    {
         return view('vagas.show', compact('vaga'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vaga $vaga)
    {
        return view('vagas.edit', compact('vaga'));
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(UpdateVagaRequest $request, Vaga $vaga)
    {
        $vaga->update($request->validated());
        return redirect()->route('vagas.index')->with('success', 'Vaga atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        return redirect()->route('vagas.index')->with('success', 'Vaga excluída com sucesso.');
    }

    /**
     * Ação customizada para pausar ou reativar a vaga.
     *
     */
    public function pausar(Vaga $vaga)
    {
        $novoStatus = $vaga->status === 'ativa' ? 'pausada' : 'ativa';
        $vaga->update(['status' => $novoStatus]);

        $mensagem = $novoStatus === 'pausada' ? 'Vaga pausada com sucesso.' : 'Vaga reativada com sucesso.';
        
        return redirect()->back()->with('success', $mensagem);
    }
}