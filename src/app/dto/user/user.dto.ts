import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Usertype } from 'src/app/entities/user/user.abstract';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'diego' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'xxdiegolsxx@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: '1234' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: Usertype.Client })
  usertype: Usertype;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false, example: '1111111' })
  contact: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false, example: 'avenida 1' })
  address: string;
}
