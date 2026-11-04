'use strict';

jest.mock('../../src/repositories/user.repository', () => ({
  findAll: jest.fn(),
  findPublicByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  countAdmins: jest.fn(),
  hasOrders: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

const bcrypt = require('bcryptjs');
const userRepository = require('../../src/repositories/user.repository');
const userService = require('../../src/services/user.service');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('hashes a new password and omits secrets from the response', async () => {
    bcrypt.hash.mockResolvedValue('hashed-password');
    userRepository.findPublicByEmail.mockResolvedValue(null);
    userRepository.create.mockImplementation(async (data) => ({
      toJSON: () => ({ id: 8, ...data }),
    }));

    const result = await userService.create({
      name: 'Operador',
      email: 'operator@example.com',
      password: 'strong-pass',
      role: 'OPERATOR',
    });

    expect(userRepository.create).toHaveBeenCalledWith({
      name: 'Operador',
      email: 'operator@example.com',
      role: 'OPERATOR',
      password_hash: 'hashed-password',
    });
    expect(result).not.toHaveProperty('password');
    expect(result).not.toHaveProperty('password_hash');
  });

  test('rejects deleting the currently authenticated user', async () => {
    userRepository.findById.mockResolvedValue({ id: 3, role: 'ADMIN' });

    await expect(userService.delete(3, 3)).rejects.toMatchObject({
      statusCode: 422,
      code: 'CANNOT_DELETE_SELF',
    });
    expect(userRepository.delete).not.toHaveBeenCalled();
  });

  test('preserves the last administrator', async () => {
    userRepository.findById.mockResolvedValue({ id: 4, role: 'ADMIN' });
    userRepository.countAdmins.mockResolvedValue(1);

    await expect(userService.delete(4, 9)).rejects.toMatchObject({
      statusCode: 422,
      code: 'LAST_ADMIN',
    });
    expect(userRepository.delete).not.toHaveBeenCalled();
  });

  test('preserves users referenced by historical orders', async () => {
    userRepository.findById.mockResolvedValue({ id: 5, role: 'OPERATOR' });
    userRepository.hasOrders.mockResolvedValue(true);

    await expect(userService.delete(5, 9)).rejects.toMatchObject({
      statusCode: 422,
      code: 'USER_HAS_ORDERS',
    });
    expect(userRepository.delete).not.toHaveBeenCalled();
  });
});
