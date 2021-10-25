import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
  }),
  JwtModule.register({
    secret: 'hard!to-guess_secret', // process.env.SECRETKEY
    signOptions: {
      expiresIn: "10h", //process.env.EXPIRESIN
    },
  })],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
