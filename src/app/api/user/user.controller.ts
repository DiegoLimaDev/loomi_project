import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserDomain } from 'src/app/entities/user/user.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { MailerService } from 'src/app/infra/mailer/mailer.service';
import { TokenGenerationService } from 'src/app/infra/token-generation/token-generation.service';
import { UserService } from 'src/app/infra/user/user.service';
import { IUserService } from 'src/app/interfaces/user/user.interface';

@Controller('user')
export class UserController implements IUserService {
  constructor(
    private userService: UserService,
    private tokenGeneration: TokenGenerationService,
    private mailerService: MailerService,
  ) {}

  @Post('create')
  async create(@Body() user: UserDomain): Promise<UserDomain> {
    const token = await this.tokenGeneration.generateVerificationToken(
      user.email,
    );
    await this.mailerService.sendVerificationMail(user.email, token);

    return await this.userService.create({
      ...user,
      isVerified: false,
      token: token,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: number): Promise<UserDomain> {
    return await this.userService.getOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<UserDomain[]> {
    return await this.userService.getAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param('id') id: number,
    @Body() user: UserDomain,
  ): Promise<boolean> {
    await this.userService.edit(id, user);

    return true;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.userService.delete(id);
  }

  @Get('email')
  @UseGuards(JwtAuthGuard)
  async getOneByEmail(@Param('email') email: string): Promise<UserDomain> {
    return await this.userService.getOneByEmail(email);
  }
}
