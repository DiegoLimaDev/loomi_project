import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/app/entities/product/product.entity';
import { ProductController } from 'src/app/api/product/product.controller';

@Module({
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
