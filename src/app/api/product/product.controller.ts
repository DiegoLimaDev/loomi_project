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
import { RolesGuard } from 'src/app/infra/auth/guards/role.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from 'src/app/dto/product/product.dto';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController implements IProdcutService {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(RolesGuard)
  @ApiBody({ type: ProductDto })
  @ApiOperation({ description: 'Cria um produto' })
  async create(@Body() product: ProductDomain): Promise<ProductDomain> {
    return await this.productService.create(product);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Get em um produto' })
  async getOne(@Param('id') id: number): Promise<ProductDomain> {
    return await this.productService.getOne(id);
  }

  @Get()
  @ApiOperation({ description: 'Get em todos os produtos' })
  async getAll(): Promise<ProductDomain[]> {
    return await this.productService.getAll();
  }

  @Get('price/:price')
  @ApiParam({ name: 'price', example: 120.5 })
  @ApiOperation({ description: 'Get em um produto por preço' })
  async getByPrice(@Param('price') price: number): Promise<ProductDomain[]> {
    return await this.productService.getByPrice(price);
  }

  @Get('stock/:stock')
  @ApiParam({ name: 'stock', example: 100 })
  @ApiOperation({ description: 'Get em um produto por estoque' })
  async getByStock(@Param('stock') stock: number): Promise<ProductDomain[]> {
    return await this.productService.getByStock(stock);
  }

  @Get('name/:name')
  @ApiParam({ name: 'name', example: 'Produto novo' })
  @ApiOperation({ description: 'Get em um produto por nome' })
  async getOneByName(@Param('name') name: string): Promise<ProductDomain> {
    return await this.productService.getOneByName(name);
  }

  @Get('description/:description')
  @ApiParam({ name: 'description', example: 'Descrição do produto novo' })
  @ApiOperation({ description: 'Get em um produto por descrição' })
  async getOneByDescription(
    @Param('description') description: string,
  ): Promise<ProductDomain> {
    return await this.productService.getOneByDescription(description);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Edita um produto por id' })
  async edit(
    @Param('id') id: number,
    @Body() product: ProductDomain,
  ): Promise<boolean> {
    return await this.productService.edit(id, product);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Deleta um produto por id' })
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.productService.delete(id);
  }
}
