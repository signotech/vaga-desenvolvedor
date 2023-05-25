import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token when valid credentials are provided', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { id: 1 };
      const token = 'generated-token';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'createToken').mockResolvedValue(token);

      const result = await controller.login({ email, password });

      expect(result).toEqual({ token });
      expect(authService.validateUser).toHaveBeenCalledWith(email, password);
      expect(authService.createToken).toHaveBeenCalledWith(user.id);
    });
  });
});
