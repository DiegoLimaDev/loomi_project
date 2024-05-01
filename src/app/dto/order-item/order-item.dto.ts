import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 5, required: true })
  qty: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  productId: number;
}
