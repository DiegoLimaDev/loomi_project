import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order.entity';
import { OrderDomain } from '../order/order.domain';
import { Product } from '../product/product.entity';
import { ProductDomain } from '../product/product.domain';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  qty: number;

  @Column({ type: 'real' })
  pricePerUnit: number;

  @Column({ type: 'real' })
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: OrderDomain;

  @ManyToOne(() => Product, (product) => product.id)
  product: ProductDomain;
}
