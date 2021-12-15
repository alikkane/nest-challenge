import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({type: String, isArray: true})
  @Get('/categories')
  async getAllCategories(): Promise<String[]> {
    return this.productsService.getAllCategories();
  }

  @ApiCreatedResponse({type: Product})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @ApiOkResponse({type: Product, isArray: true})
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll(); 
  }

  @ApiOkResponse({type: Product})
  @ApiNotFoundResponse({description: "Le produit n'existe pas"})
  @ApiNotFoundResponse()
  @Get(':sku')
  async findOne(@Param('sku') sku: string): Promise<Product>{
    const product = await this.productsService.findOne(sku);
    if(!product) {
      throw new NotFoundException("Le produit n'existe pas");
    }
    return product;
  }

  @ApiOkResponse({type: Product})
  @ApiNotFoundResponse({description: "Le produit n'existe pas"})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Patch(':sku')
  async update(@Param('sku') sku: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsService.findOne(sku);
    if(!product) {
      throw new NotFoundException("Le produit n'existe pas");
    }
    return this.productsService.update(sku, updateProductDto);
  }

  @ApiOkResponse({type: Product})
  @ApiNotFoundResponse({description: "Le produit n'existe pas"})
  @Delete(':sku')
  async remove(@Param('sku') sku: string): Promise<Product> {
    const product = await this.productsService.findOne(sku);
    if(!product) {
      throw new NotFoundException("Le produit n'existe pas");
    }
    return this.productsService.remove(sku);
  }

}
