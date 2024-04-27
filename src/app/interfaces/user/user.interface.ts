import { ClientDomain } from 'src/app/entities/client/client.domain';
import { UserDomain } from 'src/app/entities/user/user.domain';

export interface IUserService {
  create(
    user: UserDomain | ClientDomain,
    contact: string,
    address: string,
  ): Promise<UserDomain | ClientDomain>;

  getOne(id: number): Promise<UserDomain>;

  getAll(): Promise<UserDomain[]>;

  edit(id: number, user: UserDomain): Promise<boolean>;

  delete(id: number): Promise<{ deleted: boolean }>;

  getOneByEmail(email: string): Promise<UserDomain>;
}
