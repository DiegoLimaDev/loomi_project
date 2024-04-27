import { UserDomain } from 'src/app/entities/user/user.domain';

export interface IUserService {
  create(user: UserDomain): Promise<UserDomain>;

  getOne(id: number): Promise<UserDomain>;

  getAll(): Promise<UserDomain[]>;

  edit(id: number, user: UserDomain): Promise<boolean>;

  delete(id: number): Promise<boolean>;

  getOneByEmail(email: string): Promise<UserDomain>;
}
