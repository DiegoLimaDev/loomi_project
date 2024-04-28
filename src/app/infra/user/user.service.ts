import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUserService } from 'src/app/interfaces/user/user.interface';
import { UserDomain } from 'src/app/entities/user/user.domain';
import { User } from 'src/app/entities/user/user.entity';
import { ClientService } from '../client/client.service';
import { Usertype } from 'src/app/interfaces/shared/user/user.abstract';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private clientService: ClientService,
  ) {}

  async create(user: UserDomain): Promise<UserDomain> {
    const hash = await bcrypt.hash(user.password, 10);
    const date = new Date();

    return await this.userRepo.save({
      ...user,
      password: hash,
      createdAt: date,
      updatedAt: date,
    });
  }

  async getOne(id: number): Promise<UserDomain> {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new BadRequestException(`User with id: ${id} not found`);

    return user;
  }

  async getAll(): Promise<UserDomain[]> {
    return await this.userRepo.find();
  }

  async edit(id: number, user: UserDomain): Promise<boolean> {
    const date = new Date();
    await this.userRepo.update({ id }, { ...user, updatedAt: date });
    return true;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const user = await this.getOne(id);

    if (user.usertype === Usertype.Client) {
      const client = await this.clientService.getOneByFkUserId(user);
      await this.clientService.deleteLogical(client.id);
    }

    this.userRepo.delete(id);

    return { deleted: true };
  }

  async getOneByEmail(email: string): Promise<UserDomain> {
    return await this.userRepo.findOneBy({ email });
  }
}
