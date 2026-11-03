<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a página inicial redireciona para a listagem de clientes', function () {
    $this->get('/')
        ->assertRedirect(route('customers.index'));

    $this->get(route('customers.index'))
        ->assertOk();
});