import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder } from "nestjs-seeder";
import { Product } from "./schemas/product.schema";
import * as products from './electronic-catalog.json';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async seed(): Promise<any> {
    return this.productModel.insertMany(products);
  }

  async drop(): Promise<any> {
    return this.productModel.deleteMany({});
  }
}