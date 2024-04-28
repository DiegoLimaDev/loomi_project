import { OrderDomain } from 'src/app/entities/order/order.domain';

export interface IOrderService {
  create(order: OrderDomain, clientId: number): Promise<OrderDomain>;

  getOne(id: number): Promise<OrderDomain>;

  getAll(): Promise<OrderDomain[]>;

  edit(id: number, order: OrderDomain): Promise<boolean>;

  delete(id: number): Promise<{ deleted: boolean }>;
}
