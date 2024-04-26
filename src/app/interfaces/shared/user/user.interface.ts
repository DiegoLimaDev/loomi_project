import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export enum Usertype {
  Admin = 'admin',
  Client = 'client',
}

export abstract class IUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsDate()
  createdAt?: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt?: Date;

  @IsNotEmpty()
  usertype: Usertype;
}
