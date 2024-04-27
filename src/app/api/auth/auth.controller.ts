import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/app/infra/auth/auth.service';
import { UserService } from 'src/app/infra/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('emailVerification/:token/:email')
  async emailVerification(
    @Param('token') token: string,
    @Param('email') email: string,
  ): Promise<string> {
    const user = await this.userService.getOneByEmail(email);
    await this.authService.emailVerification(token, user);

    return `<h1 style="padding:10px;align-text:center;">Conta verificada com sucesso</h1>`;
  }

  @Post('login')
  async login(
    @Body() user: { email: string; password: string },
  ): Promise<{ accessToken: string }> {
    const { email, password } = user;
    return await this.authService.validateUser(email, password);
  }
}
