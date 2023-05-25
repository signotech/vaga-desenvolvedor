import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ token: string }> {
    // Lógica de autenticação
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.createToken(user.id);
    return { token };
  }
}
