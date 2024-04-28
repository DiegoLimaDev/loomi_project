import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/app/entities/order/order.entity';
import { ClientModule } from '../client/client.module';

@Module({
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order]), ClientModule],
  exports: [OrderService],
})
export class OrderModule {}
