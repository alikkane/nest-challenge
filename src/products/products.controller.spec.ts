import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };
  const mockedProduct = {
    name: 'Pong',
    category: 'Games',
    sku: 'A0001',
    price: 69.99,
    quantity: 20,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call product service', async () => {
    const spy = jest.spyOn(mockProductsService, 'findAll');
    await controller.findAll();
    expect(spy).toHaveBeenCalled();
  });

  it('should call product service findOne method with sku parameter', async () => {
    const sku: string = 'A0001';
    const spy = jest.spyOn(mockProductsService, 'findOne').mockResolvedValue(mockedProduct);
    let result = await controller.findOne(sku);
    expect(spy).toHaveBeenCalledWith(sku);
    expect(result.quantity).toEqual(20);
  });
});
