import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  async getOne(@Param('id') orderItemId: number): Promise<OrderItemsDomain> {
    return await this.orderItemsService.getOne(orderItemId);
  }

  @Get('/getAll/:id')
  async getItemsInOrder(
    @Param('id') orderId: number,
  ): Promise<OrderItemsDomain[]> {
    return await this.orderItemsService.getItemsInOrder(orderId);
  }

  @Patch(':id')
  async edit(
    @Param('id') orderId: number,
    @Body('qty') qty: number,
  ): Promise<OrderItemsDomain> {
    return await this.orderItemsService.edit(orderId, qty);
  }

  @Delete(':id')
  async delete(
    @Param('id') orderItemId: number,
  ): Promise<{ deleted: boolean }> {
    return await this.orderItemsService.delete(orderItemId);
  }
}
