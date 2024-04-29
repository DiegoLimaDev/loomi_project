import { SetMetadata } from '@nestjs/common';
import { Usertype } from 'src/app/interfaces/shared/user/user.abstract';

export const HasRoles = (...usertype: Usertype[]) =>
  SetMetadata('roles', usertype);
