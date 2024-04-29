import { OrderItemsDomain } from 'src/app/entities/order-items/order-items.domain';

export interface IOrderItems {
  create(orderData: OrderItemDto): Promise<OrderItemsDomain>;

  getItemsInOrder(orderId: number): Promise<OrderItemsDomain[]>;
}

export type OrderItemDto = {
  qty: number;
  orderId: number;
  productId: number;
};
