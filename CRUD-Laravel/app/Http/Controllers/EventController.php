<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class EventController extends Controller
{
    
    public function produtos($id){

    return view('produtos', ['id' => $id]);
    }

    public function create(){

        $search = request('search');
        $itens = (request('paginator-itens')) ? request('paginator-itens') : 20;

        if($search){
            $clients = Client::where([
                ['nome_cliente','like',"%$search%"]
            ])
            ->orwhere('cpf','like', "$search%")
            ->orwhere('email_cliente','like', "%$search%")
            ->paginate($itens);
        }else{
            $clients = Client::paginate($itens);
        }

        

        return view('gestao.crud', ['clients' => $clients, 'search' => $search]);
    }

    public function gestao(){

        

        return view('gestao.crud');
    }

    public function store(Request $request){

                

        $client = new Client;

        $client->created_at = $request->created_at;
        $client->updated_at = $request->updated_at;
        $client->nome_cliente = $request->nome;
        $client->cpf = $request->cpf;
        $client->email_cliente = $request->email;

        if($request->hasFile('image') && $request->file('image')->isValid()){

            $requestImage = $request->image;
            
            $extension = $requestImage->extension();

            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now") . "." . $extension);

            $requestImage->move(public_path('img/clients'), $imageName);

            $client->image = $imageName;
        }



        $client->save();

        $request = '';

        // return $this->create();
        return redirect('/gestao/cliente');
        // ->with('msg', 'SUCESSO!')
    }



}
