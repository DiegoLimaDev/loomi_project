import { ProductDomain } from 'src/app/entities/product/product.domain';

export interface IProdcutService {
  create(product: ProductDomain): Promise<ProductDomain>;

  getOne(id: number): Promise<ProductDomain>;

  getAll(): Promise<ProductDomain[]>;

  edit(id: number, product: ProductDomain): Promise<boolean>;

  delete(id: number): Promise<boolean>;

  getOneByName(name: string): Promise<ProductDomain>;

  getOneByDescription(description: string): Promise<ProductDomain>;

  getByPrice(price: number): Promise<ProductDomain[]>;

  getByStock(stock: number): Promise<ProductDomain[]>;
}
