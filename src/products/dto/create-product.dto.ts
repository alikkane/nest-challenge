import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}