import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./products/schemas/product.schema";
import { ProductsSeeder } from "./products/products.seeder";

seeder({
  imports: [
    MongooseModule.forRoot("mongodb://db_mongo:27017/test_db"),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
}).run([ProductsSeeder]);