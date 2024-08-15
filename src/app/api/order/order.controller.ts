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
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderDomain } from 'src/app/entities/order/order.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { RolesGuard } from 'src/app/infra/auth/guards/role.guard';
import { OrderService } from 'src/app/infra/order/order.service';
import { IOrderService } from 'src/app/interfaces/order/order.interface';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController implements IOrderService {
  constructor(private orderService: OrderService) {}

  @Post(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Cria uma ordem para o usuário por seu id' })
  async create(@Param('id') clientId: number): Promise<OrderDomain> {
    return await this.orderService.create(clientId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Get em uma ordem do usuário por id' })
  async getOne(@Param('id') id: number): Promise<OrderDomain> {
    return await this.orderService.getOne(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @ApiOperation({
    description: 'Get em todas as ordens do sistema. Apenas para admin',
  })
  async getAll(): Promise<OrderDomain[]> {
    return await this.orderService.getAll();
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Edita  uma ordem do usuário por id' })
  async edit(
    @Param('id') id: number,
    @Body() order: OrderDomain,
  ): Promise<boolean> {
    return await this.orderService.edit(id, order);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Deleta  uma ordem do usuário por id' })
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.orderService.delete(id);
  }

  @Get('get/report')
  @UseGuards(RolesGuard)
  @ApiOperation({ description: 'Gera um relatório csv com as vendas do dia' })
  async getReportByDate(@Body('date') date: string): Promise<any> {
    return await this.orderService.getReportByDate(date, 'output.csv');
  }
}
