import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminDomain } from 'src/app/entities/admin/admin.domain';
import { AdminService } from 'src/app/infra/admin/admin.service';
import { IAdmin } from 'src/app/interfaces/admin/admin.interface';
import { Usertype } from 'src/app/interfaces/shared/user/user.interface';

@Controller('admin')
export class AdminController implements IAdmin {
  constructor(private adminService: AdminService) {}

  @Post('create')
  async create(@Body() req: AdminDomain): Promise<AdminDomain> {
    return await this.adminService.create({
      ...req,
      usertype: Usertype.Admin,
    });
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<AdminDomain> {
    return await this.adminService.getOne(id);
  }

  @Get()
  async getAll(): Promise<AdminDomain[]> {
    return await this.adminService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.adminService.delete(id);
  }
}
