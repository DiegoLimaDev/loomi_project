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
import { OrderDomain } from 'src/app/entities/order/order.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { RolesGuard } from 'src/app/infra/auth/guards/role.guard';
import { OrderService } from 'src/app/infra/order/order.service';
import { IOrderService } from 'src/app/interfaces/order/order.interface';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController implements IOrderService {
  constructor(private orderService: OrderService) {}

  @Post(':id')
  async create(@Param('id') clientId: number): Promise<OrderDomain> {
    return await this.orderService.create(clientId);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<OrderDomain> {
    return await this.orderService.getOne(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  async getAll(): Promise<OrderDomain[]> {
    return await this.orderService.getAll();
  }

  @Patch(':id')
  async edit(
    @Param('id') id: number,
    @Body() order: OrderDomain,
  ): Promise<boolean> {
    return await this.orderService.edit(id, order);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.orderService.delete(id);
  }
}
