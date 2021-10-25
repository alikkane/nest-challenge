import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from "mongoose";
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newBook = new this.productModel({createdAt: new Date(), updatedAt: new Date(), ...createProductDto});
    return newBook.save();
  }

  async findAll(): Promise<Product[]>{
    return this.productModel.find();
  }

  async findOne(sku: string): Promise<Product> {
    return this.productModel.findOne({sku: sku});
  }

  async update(sku: string, updateProductDto: UpdateProductDto): Promise<Product>{
    const updatedProduct = {...updateProductDto, updatedAt: new Date()}
    return this.productModel.findOneAndUpdate({sku: sku}, updatedProduct, {new: true});
  }

  async remove(sku: string): Promise<any> {
    return this.productModel.findOneAndDelete({sku: sku});
  }

  async getAllCategories(): Promise<String[]> {
    return this.productModel.distinct('category');
  }

  
}
