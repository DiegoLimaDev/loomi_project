import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { OrderItemsModule } from '../order-items/order-items.module';

@Module({
  providers: [PaymentService],
  exports: [PaymentService],
  imports: [OrderModule, ProductModule, OrderItemsModule],
})
export class PaymentModule {}
