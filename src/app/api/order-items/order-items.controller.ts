import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderItemsDomain } from 'src/app/entities/order-items/order-items.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { OrderItemsService } from 'src/app/infra/order-items/order-items.service';
import {
  IOrderItems,
  OrderItemDto,
} from 'src/app/interfaces/order-items/order-items.interface';

@Controller('order-items')
@UseGuards(JwtAuthGuard)
export class OrderItemsController implements IOrderItems {
  constructor(private orderItemsService: OrderItemsService) {}

  @Post()
  async create(@Body() orderData: OrderItemDto): Promise<OrderItemsDomain> {
    return await this.orderItemsService.create(orderData);
  }

  @Get(':id')
  async getItemsInOrder(orderId: number): Promise<OrderItemsDomain[]> {
    return await this.orderItemsService.getItemsInOrder(orderId);
  }
}
