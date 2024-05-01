import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Produto novo' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Descrição do produto novo' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, example: 120.5 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, example: 100 })
  stock: number;
}
