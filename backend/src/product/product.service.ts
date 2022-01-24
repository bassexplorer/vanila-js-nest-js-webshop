import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { Productcategory } from './entities/product-category.entity';

@Injectable()
// TODO: add error handling
export class ProductService {
  /**
   *
   * Reachable for all users
   * @return {*}  {Promise<Product[]>}
   * @memberof ProductService
   */
  async getAllProduct(): Promise<Product[]> {
    return await Product.find({ relations: ['currency', 'productCategory'] });
  }

  /**
   *
   *
   * @return {*}  {Promise<Product[]>}
   * @memberof ProductService
   */
  async getAllProductCategory(): Promise<Productcategory[]> {
    return await Productcategory.find({
      order: { productCategoryName: 'ASC' },
    });
  }

  /**
   *
   * Reachable for all users
   * @param {string} id
   * @return {*}  {Promise<Product>}
   * @memberof ProductService
   */
  async getById(id: string): Promise<Product> {
    return await Product.findOneOrFail(id);
  }

  /**
   *
   * Only reachable for admins
   * @param {string} id
   * @return {*}  {Promise<string>}
   * @memberof ProductService
   */
  async removeProduct(id: string): Promise<string> {
    const productFromDB = await Product.findOne({
      where: { active: true, id: id },
    });

    console.log(!productFromDB);

    if (!productFromDB) {
      Logger.error(
        `Product doesn't exists with this id: ${id}`,
        null,
        ProductService.name,
      );
      throw new HttpException(
        `Product doesn't exists with this id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await Product.update(id, { isActive: false, deletedAt: Date.now() });
      return 'Product has been removed!';
    } catch (error) {
      Logger.error(
        `Product save error: ${productFromDB.name}`,
        error.stack,
        ProductService.name,
      );
      throw new HttpException(
        `Product save error: ${productFromDB.name}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   *
   * Only reachable for Admins
   * @param {Partial<Product>} product
   * @return {*}  {Promise<Product>}
   * @memberof ProductService
   */
  async createProduct(product: Partial<Product>): Promise<Product> {
    const productFromDB = await Product.findOne(product.id);

    if (product.id && productFromDB) {
      Logger.error(
        `Product already exists with this id: ${product.id}`,
        null,
        ProductService.name,
      );
      throw new HttpException(
        `Product already exists with this id: ${product.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const productToDb = Product.create(product);
      return await Product.save(productToDb);
    } catch (error) {
      Logger.error(
        `Product save error: ${product.name}`,
        error.stack,
        ProductService.name,
      );
      throw new HttpException(
        `Product save error: ${product.name}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   *
   * Reachable for only admins
   * @param {Partial<Product>} product
   * @return {*}  {Promise<UpdateResult>}
   * @memberof ProductService
   */
  async updateProduct(product: Partial<Product>): Promise<UpdateResult> {
    const productFromDB = await Product.findOneOrFail(product.id);

    if (!product.id && !productFromDB) {
      Logger.error(
        `Product does not exists with this id: ${product.id}`,
        null,
        ProductService.name,
      );
      throw new HttpException(
        `Product does not exists with this id: ${product.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // TODO: Possible that the ID is not right here!
      return await Product.update(
        product.id,
        Object.assign(new Product(), {
          ...productFromDB,
          ...product,
        }),
      );
    } catch (error) {
      Logger.error(
        `Product save error: ${product.id}`,
        error.stack,
        ProductService.name,
      );
      throw new HttpException(
        `Product save error: ${product.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
