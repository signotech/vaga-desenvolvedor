
<?php

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('um produto pode ser cadastrado', function () {
    $response = $this->post(route('products.store'), [
        'name' => 'Notebook Dell',
        'description' => 'Notebook para uso profissional',
        'price' => 3500.00,
    ]);

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'name' => 'Notebook Dell',
        'description' => 'Notebook para uso profissional',
        'price' => 3500.00,
    ]);
});

test('um produto pode ser atualizado', function () {
    $product = Product::create([
        'name' => 'Notebook Dell',
        'description' => 'Notebook antigo',
        'price' => 3500.00,
    ]);

    $response = $this->put(route('products.update', $product), [
        'name' => 'Notebook Lenovo',
        'description' => 'Notebook atualizado',
        'price' => 4200.00,
    ]);

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Notebook Lenovo',
        'description' => 'Notebook atualizado',
        'price' => 4200.00,
    ]);
});

test('um produto sem pedidos pode ser excluido', function () {
    $product = Product::create([
        'name' => 'Mouse Logitech',
        'description' => 'Mouse sem fio',
        'price' => 150.00,
    ]);

    $response = $this->delete(route('products.destroy', $product));

    $response->assertRedirect(route('products.index'));

    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
    ]);
});

test('um produto vinculado a pedido nao pode ser excluido', function () {
    $customer = Customer::create([
        'name' => 'Carlos da Silva',
        'email' => 'carlos@example.com',
        'phone' => '47966666666',
    ]);

    $product = Product::create([
        'name' => 'Teclado Logitech',
        'description' => 'Teclado sem fio',
        'price' => 200.00,
    ]);

    $order = Order::create([
        'customer_id' => $customer->id,
        'status' => 'open',
    ]);

    OrderItem::create([
        'order_id' => $order->id,
        'product_id' => $product->id,
        'quantity' => 1,
        'unit_price' => 200.00,
    ]);

    $response = $this->delete(route('products.destroy', $product));

    $response->assertRedirect(route('products.index'));

    $response->assertSessionHas('error');

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
    ]);

    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'product_id' => $product->id,
    ]);
});
