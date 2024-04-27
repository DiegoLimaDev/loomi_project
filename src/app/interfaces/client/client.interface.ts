import { ClientDomain } from 'src/app/entities/client/client.domain';

export interface IClientService {
  getOne(id: number): Promise<ClientDomain>;

  getAll(): Promise<ClientDomain[]>;

  edit(id: number, client: ClientDomain): Promise<{ deleted: boolean }>;

  delete(id: number): Promise<{ deleted: boolean }>;
}
