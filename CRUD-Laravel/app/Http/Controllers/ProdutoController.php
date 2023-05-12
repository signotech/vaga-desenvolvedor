<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    
    
    public function produtos($id){

        return view('produtos', ['id' => $id]);
        }

}
