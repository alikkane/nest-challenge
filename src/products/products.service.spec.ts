import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';



describe('ProductsService', () => {
  let service: ProductsService;

  const product: CreateProductDto = {
    name: "Pong",
    category: "Games",
    sku: "A0001",
    price: 69.99,
    quantity: 20,
  };
 
  class mockProductModel {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue([product]);
    static findOne = jest.fn().mockResolvedValue(product);
    static findOneAndUpdate = jest.fn().mockResolvedValue(product);
    static findOneAndDelete = jest.fn().mockResolvedValue(true);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, {
        provide: getModelToken('Product'),
        useValue: mockProductModel,
      }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new product and return it back', async () => {
    expect(await service.create(product)).toEqual({
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      ...product
    });
  });

  it('should return one event', async () => {
    expect(await service.findOne('53d53d2s')).toEqual(product);
  });
});
