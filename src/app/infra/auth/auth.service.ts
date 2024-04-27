import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserDomain } from 'src/app/entities/user/user.domain';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
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

    await this.userService.edit(user.id, { ...user, isVerified: true });
    return true;
  }
}
