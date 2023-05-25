import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.entity';

describe('User', () => {
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  describe('UserSchema', () => {
    it('should create a valid user', () => {
      const user = new userModel({
        nome: 'John Doe',
        email: 'johndoe@example.com',
        telefone: '123456789',
        tipoContrato: 'CLT',
        password: 'password123',
        appliedJobs: [],
      });

      expect(user.nome).toBe('John Doe');
      expect(user.email).toBe('johndoe@example.com');
      expect(user.telefone).toBe('123456789');
      expect(user.tipoContrato).toBe('CLT');
      expect(user.password).toBe('password123');
      expect(user.appliedJobs).toEqual([]);
    });
  });
});
