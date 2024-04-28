import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDomain } from 'src/app/entities/client/client.domain';
import { Client } from 'src/app/entities/client/client.entity';
import { IClientService } from 'src/app/interfaces/client/client.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService implements IClientService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async create(client: ClientDomain): Promise<ClientDomain> {
    return await this.clientRepo.save(client);
  }

  async getOne(id: number): Promise<ClientDomain> {
    const client = await this.clientRepo.findOneBy({ id });

    if (!client) throw new BadRequestException(`User with id: ${id} not found`);

    return client;
  }
  async getAll(): Promise<ClientDomain[]> {
    return await this.clientRepo.find();
  }

  async edit(id: number, client: ClientDomain): Promise<{ deleted: boolean }> {
    const date = new Date();
    await this.clientRepo.update({ id }, { ...client, updatedAt: date });
    return { deleted: true };
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    await this.getOne(id);

    this.clientRepo.delete(id);

    return { deleted: true };
  }
}