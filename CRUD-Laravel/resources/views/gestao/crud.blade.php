@extends('layouts.main')

@section('title', 'Clientes')

@section('content')

<script src="/js/clientes.js" async defer></script>

<div id="seach-container">
<h1>Lista de clientes</h1>

        <div class='actions'>
            <div class='action' id='icon-add'>ADICIONE UM CLIENTE
                <ion-icon name="add-outline"></ion-icon>
            </div> 
            <div class='action' id='icon-remove'>REMOVA UM CLIENTE
                <ion-icon name="backspace-outline"></ion-icon>
            </div> 
            <div class='action' id='icon-edit'>EDITE UM CLIENTE
                <ion-icon name="alert-outline"></ion-icon>
            </div> 
        </div>
        <div>
            
        </div>
    <form id="PESQUISAR" action="/gestao/cliente" method="GET">
        <input type="text" id='search' name='search' placeholder='procurar um cliente...'>
        <label for='search'><ion-icon name="search-sharp"></ion-icon></label>

       
        
        <div>
        <button type="submit" class="btn2"><a href='/events/cliente'>VOLTAR<a></button>
                <select name='paginator-itens' id='paginator-itens'>
                    <option value='' selected>ITENS POR PÁGINA</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            
            <button type="submit" class="btn2">PESQUISAR</button>
            
        </div>
    </form>
</div>

<div id='CREATE'>

    <h2>Cadastre um cliente<h2>
    <form id="CADASTRAR" action="/gestao/cliente/cadastro" method="POST" enctype="multipart/form-data">
    @csrf
    
    <div class="input-container">
        <input type="text" class="form-input" id="nome" name="nome" placeholder="Nome do cliente">
        <span class='errors' id='name-error'></span>
    </div>

    <div class="input-container">
        <input type="text" class="form-input" id="CPF" name="cpf" placeholder="CPF">
        <span class='errors' id='cpf-error'></span>
    </div>

    <div class="input-container">
        <input type="text" class="form-input" id="email" name="email" placeholder="E-mail">
        <span class='errors' id='email-error'></span>
    </div>
    <div class="input-container">
        <input type="file" class="form-input" id="image" name="image">
    </div>
    <button type="submit" class="btn1">ENVIAR</button>

    </form>
</div>



<div class="list-people">
    <table>

    <tr>
        <th>
            ID
        </th>
        <th>
            NOME
        </th>
        <th>
            CPF
        </th>
        <th>
            EMAIL
        </th>
    </tr>
        @foreach($clients as $client)

            <tr>
                <td>
                    {{ $client->id }}
                </td>

                <td>
                    {{ $client->nome_cliente }}
                </td>

                <td>
                    {{ $client->cpf }}
                </td>

                <td>
                    {{ $client->email_cliente }}
                </td>

            <tr>

        @endforeach
    </table>

    
</div>

<div class='pags-enter'>
    {{ $clients->links('')}}
</div>

@endsection