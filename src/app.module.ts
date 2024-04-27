import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './app/infra/admin/admin.module';
import { AuthModule } from './app/infra/auth/auth.module';
import { MailerModule } from './app/infra/mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenGenerationModule } from './app/infra/token-generation/token-generation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'loomi-db',
      entities: [`\.entity\.ts$`],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    AuthModule,
    MailerModule,
    JwtModule,
    TokenGenerationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
