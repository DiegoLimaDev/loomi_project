import { Usertype } from 'src/app/entities/user/user.abstract';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  isVerified?: boolean;

  @Column()
  token?: string;

  @Column({ type: 'enum', enum: Usertype })
  usertype: Usertype;
}
