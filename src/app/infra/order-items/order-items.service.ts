import { BadRequestException, Injectable } from '@nestjs/common';
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
import { OrderStatus } from 'src/app/entities/order/order.domain';

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

    if (order.status === OrderStatus.Confirmed)
      throw new BadRequestException(
        'The payment of this order has been confirmed',
      );

    const product = await this.productService.getOne(productId);

    if (product.stock <= 0)
      throw new BadRequestException('This product is out of stock');

    if (qty > product.stock)
      throw new BadRequestException(`There's only ${product.stock} in stock. `);

    const addItems = await this.orderItemsRepo.save({
      order: order,
      itemName: product.name,
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

  async getOne(orderItemId: number): Promise<OrderItemsDomain> {
    const item = await this.orderItemsRepo.findOneBy({ id: orderItemId });

    if (!item)
      throw new BadRequestException(`No item found with id: ${orderItemId}`);

    return item;
  }

  async getItemsInOrder(orderId: number): Promise<OrderItemsDomain[]> {
    const order = await this.orderService.getOne(orderId);

    return await this.orderItemsRepo.findBy({ order: order });
  }

  async edit(orderItemId: number, qty: number): Promise<OrderItemsDomain> {
    const item = await this.getOne(orderItemId);

    await this.orderItemsRepo.update(orderItemId, {
      ...item,
      qty,
      subtotal: item.pricePerUnit * qty,
    });

    return await this.getOne(orderItemId);
  }

  async delete(orderItemId: number): Promise<{ deleted: boolean }> {
    const item = await this.getOne(orderItemId);

    await this.orderItemsRepo.delete(item);

    return { deleted: true };
  }
}
