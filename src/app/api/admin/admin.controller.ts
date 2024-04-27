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
import { AdminDomain } from 'src/app/entities/admin/admin.domain';
import { AdminService } from 'src/app/infra/admin/admin.service';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { MailerService } from 'src/app/infra/mailer/mailer.service';
import { TokenGenerationService } from 'src/app/infra/token-generation/token-generation.service';
import { IAdmin } from 'src/app/interfaces/admin/admin.interface';
import { Usertype } from 'src/app/interfaces/shared/user/user.interface';

@Controller('admin')
export class AdminController implements IAdmin {
  constructor(
    private adminService: AdminService,
    private tokenGeneration: TokenGenerationService,
    private mailerService: MailerService,
  ) {}

  @Post('create')
  async create(@Body() admin: AdminDomain): Promise<AdminDomain> {
    const token = await this.tokenGeneration.generateVerificationToken(
      admin.email,
    );
    await this.mailerService.sendVerificationMail(admin.email, token);

    return await this.adminService.create({
      ...admin,
      usertype: Usertype.Admin,
      isVerified: false,
      token: token,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: number): Promise<AdminDomain> {
    return await this.adminService.getOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<AdminDomain[]> {
    return await this.adminService.getAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param('id') id: number,
    @Body() admin: AdminDomain,
  ): Promise<boolean> {
    await this.adminService.edit(id, admin);

    return true;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.adminService.delete(id);
  }

  @Get('email')
  @UseGuards(JwtAuthGuard)
  async getOneByEmail(@Param('email') email: string): Promise<AdminDomain> {
    return await this.adminService.getOneByEmail(email);
  }
}
