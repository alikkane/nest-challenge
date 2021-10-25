import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true})
  category: string;

  @Prop({type: String, required: true})
  sku: string;

  @Prop({type: Number, required: true})
  price: number;

  @Prop({type: Number, required: true})
  quantity: number;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);