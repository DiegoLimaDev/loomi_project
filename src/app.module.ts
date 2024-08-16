import { Module } from '@nestjs/common';
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
import { OrderModule } from './app/infra/order/order.module';
import { OrderController } from './app/api/order/order.controller';
import { OrderItemsModule } from './app/infra/order-items/order-items.module';
import { OrderItemsController } from './app/api/order-items/order-items.controller';
import { PaymentModule } from './app/infra/payment/payment.module';
import { PaymentController } from './app/api/payment/payment.controller';
import { AwsModule } from './app/infra/aws/aws.module';
import { AwsController } from './app/api/aws/aws.controller';
import { RedisModule } from './app/infra/redis/redis.module';
import { RedisController } from './app/api/redis/redis.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    OrderModule,
    OrderItemsModule,
    PaymentModule,
    AwsModule,
    RedisModule,
  ],
  controllers: [
    ClientController,
    OrderController,
    OrderItemsController,
    PaymentController,
    AwsController,
    RedisController,
  ],
  providers: [],
})
export class AppModule {}
