
<?php

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('um cliente pode ser cadastrado', function () {
    $response = $this->post(route('customers.store'), [
        'name' => 'João da Silva',
        'email' => 'joao@example.com',
        'phone' => '47999999999',
    ]);

    $response->assertRedirect(route('customers.index'));

    $this->assertDatabaseHas('customers', [
        'name' => 'João da Silva',
        'email' => 'joao@example.com',
        'phone' => '47999999999',
    ]);
});

test('um cliente pode ser atualizado', function () {
    $customer = Customer::create([
        'name' => 'João da Silva',
        'email' => 'joao@example.com',
        'phone' => '47999999999',
    ]);

    $response = $this->put(route('customers.update', $customer), [
        'name' => 'João Atualizado',
        'email' => 'joao.atualizado@example.com',
        'phone' => '47988888888',
    ]);

    $response->assertRedirect(route('customers.index'));

    $this->assertDatabaseHas('customers', [
        'id' => $customer->id,
        'name' => 'João Atualizado',
        'email' => 'joao.atualizado@example.com',
        'phone' => '47988888888',
    ]);
});

test('um cliente sem pedidos pode ser excluido', function () {
    $customer = Customer::create([
        'name' => 'Maria da Silva',
        'email' => 'maria@example.com',
        'phone' => '47977777777',
    ]);

    $response = $this->delete(route('customers.destroy', $customer));

    $response->assertRedirect(route('customers.index'));

    $this->assertDatabaseMissing('customers', [
        'id' => $customer->id,
    ]);
});

test('um cliente com pedidos nao pode ser excluido', function () {
    $customer = Customer::create([
        'name' => 'Carlos da Silva',
        'email' => 'carlos@example.com',
        'phone' => '47966666666',
    ]);

    $order = Order::create([
        'customer_id' => $customer->id,
        'status' => 'open',
    ]);

    $response = $this->delete(route('customers.destroy', $customer));

    $response->assertRedirect(route('customers.index'));

    $response->assertSessionHas('error');

    $this->assertDatabaseHas('customers', [
        'id' => $customer->id,
    ]);

    $this->assertDatabaseHas('orders', [
        'id' => $order->id,
        'customer_id' => $customer->id,
    ]);
});
