import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsDomain } from 'src/app/entities/order-items/order-items.domain';
import { OrderItems } from 'src/app/entities/order-items/order-items.entity';
import {
  IOrderItems,
  OrderItemDto,
} from 'src/app/interfaces/order-items/order-items.interface';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class OrderItemsService implements IOrderItems {
  constructor(
    @InjectRepository(OrderItems)
    private orderItemsRepo: Repository<OrderItems>,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  async create(orderData: OrderItemDto): Promise<OrderItemsDomain> {
    const { qty, orderId, productId } = orderData;
    const order = await this.orderService.getOne(orderId);

    const product = await this.productService.getOne(productId);

    const addItems = await this.orderItemsRepo.save({
      order: order,
      product: product,
      pricePerUnit: product.price,
      qty,
      subtotal: qty * product.price,
    });

    await this.orderService.edit(orderId, {
      ...order,
      total: order.total + addItems.subtotal,
    });

    return addItems;
  }

  async getItemsInOrder(orderId: number): Promise<OrderItemsDomain[]> {
    const order = await this.orderService.getOne(orderId);
    return await this.orderItemsRepo.find({ where: { order } });
  }
}
