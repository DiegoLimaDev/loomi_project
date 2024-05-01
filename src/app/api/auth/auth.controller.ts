import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/app/dto/login/login.dto';
import { AuthService } from 'src/app/infra/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('emailVerification/:token/:email')
  @ApiProperty({ description: 'Verificação de email através de link' })
  @ApiOperation({ description: 'Verifica o link enviado por email' })
  async emailVerification(
    @Param('token') token: string,
    @Param('email') email: string,
  ): Promise<string> {
    const user = await this.authService.userService.getOneByEmail(email);

    await this.authService.emailVerification(token, user);

    return `<h1 style="padding:10px;align-text:center;">Conta verificada com sucesso</h1>`;
  }

  @Post('login')
  @ApiOperation({ description: 'Login do sistema. Retorna um token.' })
  async login(@Body() user: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = user;
    return await this.authService.validateUser(email, password);
  }
}
