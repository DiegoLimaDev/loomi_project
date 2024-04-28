import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDomain, OrderStatus } from 'src/app/entities/order/order.domain';
import { Order } from 'src/app/entities/order/order.entity';
import { IOrderService } from 'src/app/interfaces/order/order.interface';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private clientService: ClientService,
  ) {}

  async create(order: OrderDomain, clientId: number): Promise<OrderDomain> {
    const date = new Date();

    const client = await this.clientService.getOne(clientId);

    return await this.orderRepo.save({
      ...order,
      createdAt: date,
      updatedAt: date,
      client: client,
    });
  }

  async getOne(id: number): Promise<OrderDomain> {
    const order = await this.orderRepo.findOneBy({ id });

    if (!order) throw new BadRequestException(`order with id: ${id} not found`);

    return order;
  }

  async getAll(): Promise<OrderDomain[]> {
    return await this.orderRepo.find();
  }

  async edit(id: number, order: OrderDomain): Promise<boolean> {
    const date = new Date();
    await this.orderRepo.update({ id }, { ...order, updatedAt: date });
    return true;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const order = await this.getOne(id);

    await this.edit(id, { ...order, status: OrderStatus.Canceled });

    return { deleted: true };
  }
}
