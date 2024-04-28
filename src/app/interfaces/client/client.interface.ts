import { ClientDomain } from 'src/app/entities/client/client.domain';
import { UserDomain } from 'src/app/entities/user/user.domain';

export interface IClientService {
  getOne(id: number): Promise<ClientDomain>;

  getAll(): Promise<ClientDomain[]>;

  edit(id: number, client: ClientDomain): Promise<{ deleted: boolean }>;

  delete(id: number): Promise<{ deleted: boolean }>;

  deleteLogical(id: number): Promise<{ deleted: boolean }>;

  getOneByFkUserId(user: UserDomain): Promise<ClientDomain>;
}
