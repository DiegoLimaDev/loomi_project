import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/app/entities/product/product.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    const date = new Date();
    return await this.productRepo.save({
      ...product,
      createdAt: date,
      updatedAt: date,
    });
  }

  async getOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product)
      throw new BadRequestException(`Product with id: ${id} not found`);

    return product;
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async edit(id: number, product: Product): Promise<boolean> {
    const date = new Date();
    await this.productRepo.update(id, { ...product, updatedAt: date });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.getOne(id);

    this.productRepo.delete(id);

    return true;
  }

  async getOneByName(name: string): Promise<Product> {
    return await this.productRepo.findOneBy({ name });
  }

  async getOneByDescription(description: string): Promise<Product> {
    return await this.productRepo.findOneBy({ description });
  }

  async getByPrice(price: number): Promise<Product[]> {
    return await this.productRepo.find({ where: { price } });
  }

  async getByStock(stock: number): Promise<Product[]> {
    return await this.productRepo.find({ where: { stock } });
  }
}
