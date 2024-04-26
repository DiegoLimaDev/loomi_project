import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.adminService.getOneByEmail(email);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const { email } = user;
      const token = this.jwtService.sign({ email });
      return { accessToken: token };
    } else {
      throw new UnauthorizedException('Check your credentials');
    }
  }
}
