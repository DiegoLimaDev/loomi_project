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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientDomain } from 'src/app/entities/client/client.domain';
import { UserDomain } from 'src/app/entities/user/user.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { RolesGuard } from 'src/app/infra/auth/guards/role.guard';
import { ClientService } from 'src/app/infra/client/client.service';
import { MailerService } from 'src/app/infra/mailer/mailer.service';
import { TokenGenerationService } from 'src/app/infra/token-generation/token-generation.service';
import { UserService } from 'src/app/infra/user/user.service';
import { Usertype } from 'src/app/entities/user/user.abstract';
import { IUserService } from 'src/app/interfaces/user/user.interface';
import { CreateUserDto } from 'src/app/dto/user/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController implements IUserService {
  constructor(
    private userService: UserService,
    private tokenGeneration: TokenGenerationService,
    private mailerService: MailerService,
    private clientService: ClientService,
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Cria um usuário cliente ou admin' })
  async create(
    @Body() user: UserDomain,
    @Body('contact') contact: string,
    @Body('address') address: string,
  ): Promise<UserDomain | ClientDomain> {
    const token = await this.tokenGeneration.generateVerificationToken(
      user.email,
    );
    await this.mailerService.sendVerificationMail(user.email, token);

    const createUser = await this.userService.create({
      ...user,
      isVerified: false,
      token: token,
    });

    if (user.usertype === Usertype.Admin) return createUser;

    if (user.usertype === Usertype.Client) {
      return await this.clientService.create({
        ...user,
        contact: 'contact',
        address: address,
        user: createUser,
        status: false,
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Get em um usuário por id' })
  async getOne(@Param('id') id: number): Promise<UserDomain> {
    return await this.userService.getOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get em todos os usuários' })
  async getAll(): Promise<UserDomain[]> {
    return await this.userService.getAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Edita um usuário por id' })
  async edit(
    @Param('id') id: number,
    @Body() user: UserDomain,
  ): Promise<boolean> {
    await this.userService.edit(id, user);

    return true;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Deleta um usuário por id' })
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.userService.delete(id);
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'email', example: 'xxdiegolsxx@gmail.com' })
  @ApiOperation({ description: 'Get em um usuário por email' })
  async getOneByEmail(@Param('email') email: string): Promise<UserDomain> {
    return await this.userService.getOneByEmail(email);
  }
}
