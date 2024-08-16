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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderItemDto } from 'src/app/dto/order-item/order-item.dto';
import { OrderItemsDomain } from 'src/app/entities/order-items/order-items.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { OrderItemsService } from 'src/app/infra/order-items/order-items.service';
import { IOrderItems } from 'src/app/interfaces/order-items/order-items.interface';

@ApiBearerAuth()
@ApiTags('Order-Items')
@Controller('order-items')
@UseGuards(JwtAuthGuard)
export class OrderItemsController implements IOrderItems {
  constructor(private orderItemsService: OrderItemsService) {}

  @Post()
  @ApiBody({ type: OrderItemDto, description: 'Adiciona itens à uma ordem' })
  @ApiOperation({ description: 'Adiciona um item à ordem do usuário' })
  async create(@Body() orderData: OrderItemDto): Promise<OrderItemsDomain> {
    return await this.orderItemsService.create(orderData);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Get no item de uma ordem' })
  async getOne(@Param('id') orderItemId: number): Promise<OrderItemsDomain> {
    return await this.orderItemsService.getOne(orderItemId);
  }

  @Get('/getAll/:id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({
    description: 'Get em todos os itens que estão na order com o id',
  })
  async getItemsInOrder(
    @Param('id') orderId: number,
  ): Promise<OrderItemsDomain[]> {
    return await this.orderItemsService.getItemsInOrder(orderId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Edita um item de uma ordem por id' })
  async edit(
    @Param('id') orderId: number,
    @Body('qty') qty: number,
  ): Promise<OrderItemsDomain> {
    return await this.orderItemsService.edit(orderId, qty);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Delete um item de uma ordem por id' })
  async delete(
    @Param('id') orderItemId: number,
  ): Promise<{ deleted: boolean }> {
    return await this.orderItemsService.delete(orderItemId);
  }
}
