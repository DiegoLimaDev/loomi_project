import { AdminDomain } from 'src/app/entities/admin/admin.domain';

export interface IAdmin {
  create(admin: AdminDomain): Promise<AdminDomain>;

  getOne(id: number): Promise<AdminDomain>;

  getAll(): Promise<AdminDomain[]>;

  delete(id: number): Promise<boolean>;
}
