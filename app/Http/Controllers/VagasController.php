<?php

namespace App\Http\Controllers;

use App\Models\Vaga;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\View\View;


class VagasController extends Controller
{
    public function index(): View
    {
        $vagas = Vaga::query()->paginate(20);

        return view('vagas', compact('vagas'));
    }
}
