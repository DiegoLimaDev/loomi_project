import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenGenerationModule } from '../token-generation/token-generation.module';
import { MailerModule } from '../mailer/mailer.module';
import { User } from 'src/app/entities/user/user.entity';
import { UserService } from './user.service';
import { UserController } from 'src/app/api/user/user.controller';
import { ClientModule } from '../client/client.module';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenGenerationModule,
    MailerModule,
    ClientModule,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
