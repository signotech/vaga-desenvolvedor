<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VagaController extends Controller
{
    public function index(Request $r)
    {
        $q       = trim((string) $r->query('q', ''));
        $tipo    = trim((string) $r->query('tipo', ''));
        $status  = trim((string) $r->query('status', ''));
        $sort    = (string) $r->query('sort', 'id');
        $dir     = strtolower((string) $r->query('dir', 'asc')) === 'desc' ? 'desc' : 'asc';
        $perPage = (int) $r->query('per_page', 20);

        $allowedSorts = ['id','titulo','tipo','status','created_at'];
        if (!in_array($sort, $allowedSorts, true)) $sort = 'id';
        if ($perPage <= 0 || $perPage > 200) $perPage = 20;

        $query = Vaga::query();

        if ($q !== '')      $query->where('titulo','like',"%{$q}%");
        if ($tipo !== '')   $query->where('tipo',$tipo);
        if ($status !== '') $query->where('status',$status);

        return $query->orderBy($sort,$dir)->paginate($perPage);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'titulo' => ['required','string','max:255'],
            'tipo'   => ['required', Rule::in(['CLT','PJ','Freelancer'])],
            'status' => ['required', Rule::in(['ativa','pausada'])],
        ]);
        $vaga = Vaga::create($data);
        return response()->json($vaga, 201);
    }

    public function show(Vaga $vaga)
    {
        return $vaga;
    }

    public function update(Request $r, Vaga $vaga)
    {
        $data = $r->validate([
            'titulo' => ['sometimes','required','string','max:255'],
            'tipo'   => ['sometimes','required', Rule::in(['CLT','PJ','Freelancer'])],
            'status' => ['sometimes','required', Rule::in(['ativa','pausada'])],
        ]);
        $vaga->update($data);
        return $vaga;
    }

    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        return response()->noContent();
    }
}
