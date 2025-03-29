<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProdutoController extends Controller {
    
    public function index(): View {

        $produtos = Produto::all();

        return view('produtos.index', compact('produtos'));
    }

    public function create(): View {
        return view('produtos.create');
    }

    public function store(Request $request): RedirectResponse {
        return redirect()->route('produtos.index');
    }

    public function show($id): View {
        return view('produtos.show');
    }

    public function edit($id): View {
        return view('produtos.edit');
    }

    public function update(Request $request, $id): RedirectResponse {
        return redirect()->route('produtos.index');
    }
    
    public function destroy($id): RedirectResponse {
        return redirect()->route('produtos.index');
    }
}
