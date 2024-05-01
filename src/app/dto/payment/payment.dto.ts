import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 5000 })
  amount: number;
}
