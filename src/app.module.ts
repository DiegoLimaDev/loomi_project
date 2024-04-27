import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/infra/auth/auth.module';
import { MailerModule } from './app/infra/mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenGenerationModule } from './app/infra/token-generation/token-generation.module';
import { UserModule } from './app/infra/user/user.module';
import { ClientModule } from './app/infra/client/client.module';
import { ClientController } from './app/api/client/client.controller';
import { ProductModule } from './app/infra/product/product.module';

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
    UserModule,
    AuthModule,
    MailerModule,
    JwtModule,
    TokenGenerationModule,
    ClientModule,
    ProductModule,
  ],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule {}
