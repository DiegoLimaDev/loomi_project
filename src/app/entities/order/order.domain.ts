import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ClientDomain } from '../client/client.domain';

export enum OrderStatus {
  Confirmed = 'confirmed',
  Preparing = 'preparing',
  Sent = 'sent',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

export class OrderDomain {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  status: OrderStatus;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  client: ClientDomain;
}
