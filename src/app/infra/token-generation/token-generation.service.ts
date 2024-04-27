import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGenerationService {
  constructor(private jwtService: JwtService) {}

  async generateVerificationToken(email: string): Promise<string> {
    const payload = { email };
    const options = { expiresIn: 3600 };
    return this.jwtService.sign(payload, options);
  }
}
