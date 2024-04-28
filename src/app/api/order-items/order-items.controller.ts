import { Body, Controller, Post } from '@nestjs/common';
import { OrderItemsDomain } from 'src/app/entities/order-items/order-items.domain';
import { OrderItemsService } from 'src/app/infra/order-items/order-items.service';
import {
  IOrderItems,
  OrderItemDto,
} from 'src/app/interfaces/order-items/order-items.interface';

@Controller('order-items')
export class OrderItemsController implements IOrderItems {
  constructor(private orderItemsService: OrderItemsService) {}

  @Post()
  async create(@Body() orderData: OrderItemDto): Promise<OrderItemsDomain> {
    return await this.orderItemsService.create(orderData);
  }
}
