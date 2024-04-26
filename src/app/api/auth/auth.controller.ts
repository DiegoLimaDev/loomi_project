import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/app/infra/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() user: { email: string; password: string },
  ): Promise<{ accessToken: string }> {
    const { email, password } = user;
    return await this.authService.validateUser(email, password);
  }
}
