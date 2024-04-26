import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminDomain } from 'src/app/entities/admin/admin.domain';
import { Admin } from 'src/app/entities/admin/admin.entity';
import { IAdmin } from 'src/app/interfaces/admin/admin.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements IAdmin {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}

  async create(admin: AdminDomain): Promise<AdminDomain> {
    const hash = await bcrypt.hash(admin.password, 10);
    const date = new Date();
    console.log(hash);

    return await this.adminRepo.save({
      ...admin,
      password: hash,
      createdAt: date,
      updatedAt: date,
    });
  }

  async getOne(id: number): Promise<AdminDomain> {
    const admin = await this.adminRepo.findOneBy({ id });

    if (!admin) throw new BadRequestException(`User with id: ${id} not found`);

    return admin;
  }

  async getAll(): Promise<AdminDomain[]> {
    return await this.adminRepo.find();
  }

  async delete(id: number): Promise<boolean> {
    await this.getOne(id);

    this.adminRepo.delete(id);

    return true;
  }
}
