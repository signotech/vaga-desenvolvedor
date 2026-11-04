@extends('layouts.app')
@section('title', $customer->exists ? 'Editar cliente' : 'Novo cliente')
@section('content')
<h4>{{ $customer->exists ? 'Editar cliente' : 'Novo cliente' }}</h4>
<div class="card"><div class="card-content"><form method="POST" action="{{ $customer->exists ? route('clientes.update',$customer) : route('clientes.store') }}">@csrf @if($customer->exists)@method('PUT')@endif
<div class="row"><div class="input-field col s12 m6"><input name="name" value="{{ old('name',$customer->name) }}" required><label class="active">Nome completo *</label></div><div class="input-field col s12 m6"><input name="email" type="email" value="{{ old('email',$customer->email) }}" required><label class="active">E-mail *</label></div><div class="input-field col s12 m6"><input name="cpf" maxlength="11" value="{{ old('cpf',$customer->cpf) }}"><label class="active">CPF (11 números)</label></div><div class="input-field col s12 m6"><input name="phone" value="{{ old('phone',$customer->phone) }}"><label class="active">Telefone</label></div></div>
<button class="btn">Salvar</button> <a class="btn-flat" href="{{ route('clientes.index') }}">Cancelar</a></form></div></div>
@endsection
