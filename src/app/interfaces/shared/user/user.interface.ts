import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export enum Usertype {
  Admin = 'admin',
  Client = 'client',
}

export abstract class IUser {
  @IsNumber()
  id?: number;

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
  @IsBoolean()
  isVerified?: boolean;

  @IsNotEmpty()
  @IsString()
  token?: string;

  @IsNotEmpty()
  usertype: Usertype;
}
