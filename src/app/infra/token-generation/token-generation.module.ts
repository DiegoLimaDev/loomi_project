import { Module } from '@nestjs/common';
import { TokenGenerationService } from './token-generation.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokenGenerationService],
  exports: [TokenGenerationService],
  imports: [
    JwtModule.register({
      secret: 'tokenEmail',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
})
export class TokenGenerationModule {}
