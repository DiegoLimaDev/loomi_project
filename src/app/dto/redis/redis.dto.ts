import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class redisDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: '1' })
  key: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'example' })
  value: string;
}
