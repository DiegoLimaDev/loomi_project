import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDomain } from 'src/app/entities/product/product.domain';
import { Product } from 'src/app/entities/product/product.entity';
import { IProdcutService } from 'src/app/interfaces/product/product.interface';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProductService implements IProdcutService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(product: ProductDomain): Promise<ProductDomain> {
    const date = new Date();

    if (product.stock < 0)
      throw new BadRequestException(`The product stock can't be negative`);

    return await this.productRepo.save({
      ...product,
      createdAt: date,
      updatedAt: date,
    });
  }

  async getOne(id: number): Promise<ProductDomain> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product)
      throw new BadRequestException(`Product with id: ${id} not found`);

    return product;
  }

  async getAll(): Promise<ProductDomain[]> {
    return await this.productRepo.find();
  }

  async edit(id: number, product: ProductDomain): Promise<boolean> {
    const date = new Date();
    await this.productRepo.update(id, { ...product, updatedAt: date });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.getOne(id);

    this.productRepo.delete(id);

    return true;
  }

  async getOneByName(name: string): Promise<ProductDomain> {
    return await this.productRepo.findOneBy({ name });
  }

  async getOneByDescription(description: string): Promise<ProductDomain> {
    return await this.productRepo.findOneBy({ description });
  }

  async getByPrice(price: number): Promise<ProductDomain[]> {
    return await this.productRepo.find({ where: { price } });
  }

  async getByStock(stock: number): Promise<ProductDomain[]> {
    return await this.productRepo.find({ where: { stock } });
  }
}
