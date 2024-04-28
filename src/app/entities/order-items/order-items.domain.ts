import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderDomain } from '../order/order.domain';
import { ProductDomain } from '../product/product.domain';

export class OrderItemsDomain {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  @IsNumber()
  pricePerUnit: number;

  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @IsNotEmpty()
  order: OrderDomain;

  @IsNotEmpty()
  product: ProductDomain;
}
