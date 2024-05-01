import { OrderItemsDomain } from 'src/app/entities/order-items/order-items.domain';

export interface IOrderItems {
  create(orderData: OrderItemDto): Promise<OrderItemsDomain>;

  getOne(orderItemId: number): Promise<OrderItemsDomain>;

  getItemsInOrder(orderId: number): Promise<OrderItemsDomain[]>;

  edit(orderItemId: number, qty: number): Promise<OrderItemsDomain>;

  delete(orderItemId: number): Promise<{ deleted: boolean }>;
}

export type OrderItemDto = {
  qty: number;
  orderId: number;
  productId: number;
};
