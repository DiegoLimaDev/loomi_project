import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'xxdiegolsxx@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: '1234' })
  password: string;
}
