import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from 'src/app/entities/order-items/order-items.entity';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([OrderItems]), OrderModule, ProductModule],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
