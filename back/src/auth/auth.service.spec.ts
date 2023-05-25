import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createToken', () => {
    it('should create and return a JWT token', async () => {
      const userId = 1;
      const token = 'jwt_token';
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await service.createToken(userId);

      expect(result).toBe(token);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: userId });
    });
  });

  describe('verifyToken', () => {
    it('should verify and return the decoded payload of a JWT token', async () => {
      const token = 'jwt_token';
      const decodedPayload = { sub: 1 };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(decodedPayload);

      const result = await service.verifyToken(token);

      expect(result).toBe(decodedPayload);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
    });

    it('should throw an error if the token is invalid', async () => {
      const token = 'invalid_token';
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));

      await expect(service.verifyToken(token)).rejects.toThrowError('Token inválido');
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
    });
  });

  describe('validateUser', () => {
    it('should validate user credentials and return the user if valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { email, password };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser(email, password);

      expect(result).toBe(user);
      expect(userModel.findOne).toHaveBeenCalledWith({ email, password });
    });

    it('should throw an error if user credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await expect(service.validateUser(email, password)).rejects.toThrowError('Credenciais inválidas');
      expect(userModel.findOne).toHaveBeenCalledWith({ email, password });
    });
  });
});
