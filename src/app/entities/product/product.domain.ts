import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDomain {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock?: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
