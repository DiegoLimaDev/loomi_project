import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../user/user.entity';
import { IUser } from 'src/app/interfaces/shared/user/user.abstract';

export class ClientDomain extends IUser {
  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
