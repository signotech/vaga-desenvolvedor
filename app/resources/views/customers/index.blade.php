@extends('layouts.app')
@section('title','Clientes')
@section('content')
<div class="row"><div class="col s8"><h4>Clientes</h4><p class="muted">Cadastro e gerenciamento de clientes.</p></div><div class="col s4 right-align" style="padding-top:18px"><a class="btn" href="{{ route('clientes.create') }}"><i class="material-icons left">add</i>Novo</a></div></div>
<div class="card"><div class="card-content">
<form method="GET" class="row" style="margin-bottom:0">
@foreach(['name'=>'Nome','cpf'=>'CPF','email'=>'E-mail','phone'=>'Telefone'] as $field=>$label)
<div class="input-field col s12 m3"><input name="{{ $field }}" value="{{ request($field) }}" placeholder="{{ $label }}"><label class="active">{{ $label }}</label></div>
@endforeach
<div class="col s12"><button class="btn-small">Filtrar</button> <a href="{{ route('clientes.index') }}">Limpar</a></div></form>
<form method="POST" action="{{ route('clientes.bulk-destroy') }}" id="bulk-form">@csrf @method('DELETE')
<div class="right-align"><button class="btn-small red" onclick="return confirmDelete('Excluir os clientes selecionados?')">Excluir selecionados</button></div>
<table class="striped responsive-table"><thead><tr><th><label><input type="checkbox" onclick="toggleAll(this)"><span></span></label></th>
@foreach(['id'=>'ID','name'=>'Nome','cpf'=>'CPF','email'=>'E-mail','phone'=>'Telefone'] as $field=>$label)<th><a class="black-text" href="{{ request()->fullUrlWithQuery(['sort'=>$field,'direction'=>request('direction')==='asc'?'desc':'asc']) }}">{{ $label }} ↕</a></th>@endforeach<th>Ações</th></tr></thead>
<tbody>@forelse($customers as $customer)<tr><td><label><input class="row-check" type="checkbox" name="ids[]" value="{{ $customer->id }}"><span></span></label></td><td>{{ $customer->id }}</td><td><a href="{{ route('clientes.show',$customer) }}">{{ $customer->name }}</a></td><td>{{ $customer->cpf }}</td><td>{{ $customer->email }}</td><td>{{ $customer->phone }}</td><td><a href="{{ route('clientes.edit',$customer) }}">Editar</a> · <form style="display:inline" method="POST" action="{{ route('clientes.destroy',$customer) }}" onsubmit="return confirmDelete()">@csrf @method('DELETE')<button class="btn-flat red-text">Excluir</button></form></td></tr>
@empty<tr><td colspan="7">Nenhum cliente encontrado.</td></tr>@endforelse</tbody></table></form>
<div class="row" style="margin-top:18px"><div class="col s6">{{ $customers->links('pagination::simple-materialize') }}</div><div class="col s6">@include('partials.pagination-size',['paginator'=>$customers])</div></div>
</div></div>
@endsection
