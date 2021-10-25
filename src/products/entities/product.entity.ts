import { ApiProperty } from "@nestjs/swagger";

export class Product {

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
