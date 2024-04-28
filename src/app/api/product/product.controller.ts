import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from 'src/app/infra/product/product.service';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { IProdcutService } from 'src/app/interfaces/product/product.interface';
import { ProductDomain } from 'src/app/entities/product/product.domain';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController implements IProdcutService {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() product: ProductDomain): Promise<ProductDomain> {
    return await this.productService.create(product);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ProductDomain> {
    return await this.productService.getOne(id);
  }

  @Get()
  async getAll(): Promise<ProductDomain[]> {
    return await this.productService.getAll();
  }

  @Get('price/:price')
  async getByPrice(@Param('price') price: number): Promise<ProductDomain[]> {
    return await this.productService.getByPrice(price);
  }

  @Get('stock/:stock')
  async getByStock(@Param('stock') stock: number): Promise<ProductDomain[]> {
    return await this.productService.getByStock(stock);
  }

  @Get('name/:name')
  async getOneByName(@Param('name') name: string): Promise<ProductDomain> {
    return await this.productService.getOneByName(name);
  }

  @Get('description/:description')
  async getOneByDescription(
    @Param('description') description: string,
  ): Promise<ProductDomain> {
    return await this.productService.getOneByDescription(description);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: number,
    @Body() product: ProductDomain,
  ): Promise<boolean> {
    return await this.productService.edit(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.productService.delete(id);
  }
}
