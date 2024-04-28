import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserDomain } from 'src/app/entities/user/user.domain';
import { ClientService } from '../client/client.service';
import { Usertype } from 'src/app/interfaces/shared/user/user.abstract';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    public userService: UserService,
    private clientService: ClientService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.getOneByEmail(email);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const { email } = user;
      const token = this.jwtService.sign({ email });
      return { accessToken: token };
    } else {
      throw new UnauthorizedException('Check your credentials');
    }
  }

  async emailVerification(token: string, user: UserDomain): Promise<boolean> {
    if (token !== user.token) {
      throw new BadRequestException();
    }

    if (user.usertype === Usertype.Client) {
      const client = await this.clientService.getOneByFkUserId(user);
      await this.clientService.edit(client.id, { ...client, status: true });
    }

    await this.userService.edit(user.id, { ...user, isVerified: true });
    return true;
  }
}
