import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Productcategory } from './entities/product-category.entity';
/**
 *This is the product enpoint of the API where
 *users of the webshop can GET, PUT and POST new products
 *
 * @export
 * @class ProductController
 */
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Needed endpoints
  // get products
  // get product by id

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAllProduct();
  }

  @Get('categories')
  async getAllCategory(): Promise<Productcategory[]> {
    return await this.productService.getAllProductCategory();
  }

  @Get(':id')
  // This is a param like this: product/1
  async getOneById(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  // TODO: Add AuthGuard
  @Post('save')
  async createProduct(@Body() product: CreateProductDTO) {
    return this.productService.createProduct(product);
  }

  @Put('update')
  async updateProduct(@Body() product: UpdateProductDTO) {
    return this.productService.updateProduct(product);
  }
  @Delete(':id')
  // This is a param like this: product/1
  async removeProduct(@Param('id') id: string) {
    return await this.productService.removeProduct(id);
  }
}
