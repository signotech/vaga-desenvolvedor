'use strict';

jest.mock('../../src/repositories/client.repository', () => ({
  findAll: jest.fn(),
}));
jest.mock('../../src/repositories/product.repository', () => ({
  findAll: jest.fn(),
}));
jest.mock('../../src/repositories/order.repository', () => ({
  findAll: jest.fn(),
}));

const clientRepository = require('../../src/repositories/client.repository');
const productRepository = require('../../src/repositories/product.repository');
const orderRepository = require('../../src/repositories/order.repository');
const clientService = require('../../src/services/client.service');
const productService = require('../../src/services/product.service');
const orderService = require('../../src/services/order.service');

describe('CRUD list filters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clientRepository.findAll.mockResolvedValue({ clients: [], total: 0 });
    productRepository.findAll.mockResolvedValue({ products: [], total: 0 });
    orderRepository.findAll.mockResolvedValue({ orders: [], total: 0 });
  });

  test('passes client creation-date filters to the repository', async () => {
    await clientService.list({ dateFrom: '2026-01-01', dateTo: '2026-01-31' });

    expect(clientRepository.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ dateFrom: '2026-01-01', dateTo: '2026-01-31' })
    );
  });

  test('rejects invalid client dates', async () => {
    await expect(clientService.list({ dateFrom: '2026-02-31' })).rejects.toMatchObject({
      statusCode: 400,
      code: 'INVALID_FILTER',
    });
  });

  test('passes product price and stock ranges to the repository', async () => {
    await productService.list({ priceMin: '10', priceMax: '100', stockMin: '1', stockMax: '9' });

    expect(productRepository.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ priceMin: '10', priceMax: '100', stockMin: '1', stockMax: '9' })
    );
  });

  test('rejects inverted product ranges', async () => {
    await expect(productService.list({ stockMin: '10', stockMax: '2' })).rejects.toMatchObject({
      statusCode: 400,
      code: 'INVALID_FILTER',
    });
  });

  test('passes order status, product, date, discount, and total filters', async () => {
    await orderService.list({
      status: 'OPEN',
      productId: '4',
      dateFrom: '2026-01-01',
      dateTo: '2026-01-31',
      discountMin: '5',
      discountMax: '20',
      totalMin: '100',
      totalMax: '500',
    });

    expect(orderRepository.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'OPEN',
        productId: '4',
        dateFrom: '2026-01-01',
        dateTo: '2026-01-31',
        discountMin: '5',
        discountMax: '20',
        totalMin: '100',
        totalMax: '500',
      })
    );
  });

  test('rejects inverted order totals and invalid dates', async () => {
    await expect(orderService.list({ totalMin: '20', totalMax: '10' })).rejects.toMatchObject({
      statusCode: 400,
      code: 'INVALID_FILTER',
    });
    await expect(orderService.list({ dateTo: 'not-a-date' })).rejects.toMatchObject({
      statusCode: 400,
      code: 'INVALID_FILTER',
    });
  });
});
