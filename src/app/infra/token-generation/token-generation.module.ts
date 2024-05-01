import { Module } from '@nestjs/common';
import { TokenGenerationService } from './token-generation.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokenGenerationService],
  exports: [TokenGenerationService],
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_TOKEN_MAIL,
        signOptions: {
          expiresIn: 7200,
        },
      }),
    }),
  ],
})
export class TokenGenerationModule {}
