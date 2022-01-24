import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Customer } from './entity/customer.entity';

@Injectable()
export class CustomersService {
  /**
   *
   * Post create user (register user)
   * @param {Partial<Customer>} customer
   * @return {*}  {Promise<Customer>}
   * @memberof CustomersService
   */
  async save(customer: Partial<Customer>): Promise<Customer> {
    console.log('customer from save', customer);
    const customerFromDB = await Customer.findOne({ email: customer.email });
    console.log(customerFromDB);
    if (customer.email && customerFromDB?.email) {
      Logger.error(
        `Customer already exists with this email: ${customer.email}`,
        CustomersService.name,
      );
      throw new HttpException(
        `Customer already exists with this email: ${customer.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const customerToDb = Customer.create(customer);
      return await Customer.save(customerToDb);
    } catch (error) {
      Logger.error(
        `Customer save error: ${customer.email}`,
        error.stack,
        CustomersService.name,
      );
      throw new HttpException(
        `Customer save error: ${customer.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   *
   * Update user
   * @param {string} id
   * @param {Partial<Customer>} customer
   * @return {*}  {Promise<UpdateResult>}
   * @memberof CustomersService
   */
  async update(
    id: string,
    { email, ...customer }: Partial<Customer>,
  ): Promise<UpdateResult> {
    const { password, ...customerFromDB } = await Customer.findOne(id);
    if (!customerFromDB) {
      Logger.error(`Id not found: ${id}`, null, CustomersService.name);
      throw new HttpException(`Id not found: ${id}`, HttpStatus.NOT_FOUND);
    }

    try {
      return await Customer.update(
        id,
        Object.assign(new Customer(), {
          ...customerFromDB,
          ...customer,
        }),
      );
    } catch (error) {
      Logger.error(
        `Customer update error: ${email}`,
        error,
        CustomersService.name,
      );
      throw new HttpException(
        `Customer update error: ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**
   *
   *
   * @param {string} id
   * @return {*}  {Promise<Customer>}
   * @memberof CustomersService
   */
  async getUserById(id: string): Promise<Partial<Customer>> {
    try {
      const { password, ...restOfUser } = await Customer.findOneOrFail(id);
      return restOfUser;
    } catch (error) {
      Logger.error(`Id not found: ${id}`, null, CustomersService.name);
      throw new HttpException(`Id not found: ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
