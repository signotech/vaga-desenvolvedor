<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    
    public function produtos($id){

        return view('produtos', ['id' => $id]);
        }

}
