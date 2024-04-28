import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from './order.domain';
import { ClientDomain } from '../client/client.domain';
import { Client } from '../client/client.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.id)
  client: ClientDomain;
}
