import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDomain, OrderStatus } from 'src/app/entities/order/order.domain';
import { Order } from 'src/app/entities/order/order.entity';
import { IOrderService } from 'src/app/interfaces/order/order.interface';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { createObjectCsvWriter } from 'csv-writer';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private clientService: ClientService,
  ) {}

  async create(clientId: number): Promise<OrderDomain> {
    const date = new Date();

    const client = await this.clientService.getOne(clientId);

    return await this.orderRepo.save({
      status: OrderStatus.Pending,
      createdAt: date,
      updatedAt: date,
      client: client,
      total: 0,
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

  async getReportByDate(date: string, filePath: string): Promise<any> {
    const [dd, mm, yyyy] = date.split('-');
    const createDate = new Date(`${yyyy}-${mm}-${dd}`);
    const dateString = createDate.toISOString().split('T')[0];

    const status = 'confirmed' || 'preparing' || 'sent' || 'delivered';

    const data = await this.orderRepo
      .createQueryBuilder('order')
      .where(`DATE(order.createdAt) = :date`, { date: dateString })
      .andWhere(`order.status = :status`, { status })
      .getMany();

    const sumTotal = data.reduce((prev, next) => prev + next.total, 0);
    const { length } = data;
    const media = sumTotal / length;

    const dataToExport = [
      ...data,
      { quantidadeVendas: length },
      { sumTotal },
      { mediaPorVenda: media },
    ];

    const headers = [
      'id',
      'status',
      'createdAt',
      'updatedAt',
      'total',
      'quantidadeVendas',
      'sumTotal',
      'mediaPorVenda',
    ];

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: headers.map((item) => ({ id: item, title: item })),
    });

    await csvWriter.writeRecords(dataToExport);
    return `Arquivo CSV exportado para: ${filePath}`;
  }
}
