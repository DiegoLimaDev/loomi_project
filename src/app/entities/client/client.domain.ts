import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/app/interfaces/shared/user/user.interface';
import { User } from '../user/user.entity';

export class ClientDomain extends IUser {
  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  user: User;
}
