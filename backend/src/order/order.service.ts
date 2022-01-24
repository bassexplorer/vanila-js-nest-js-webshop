import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { Invoiceline } from './entities/invoiceline.entity';

@Injectable()
export class OrderService {
  async getAllOrderByCustomerId(id: string) {
    return await Invoice.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.invoicelines', 'invoicelines')
      .leftJoinAndSelect('invoice.currency', 'currencyOfInvoice')
      .leftJoinAndSelect('invoicelines.product', 'product')
      .leftJoinAndSelect('product.currency', 'currencyOfProduct')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .where('invoice.customerId =:customerId', { customerId: id })
      .andWhere('invoice.isActive =:active', { active: true })
      .getMany();
  }

  async createInvoice(order: Partial<Invoice>) {
    const { invoicelines, ...invoice } = order;

    const createdInvoice = Invoice.create(invoice);
    const createdInvoiceLine = Invoiceline.create(invoicelines);

    await getManager()
      .transaction(async (transactionalEntityManager) => {
        const { id } = await transactionalEntityManager.save(createdInvoice);

        createdInvoiceLine.forEach((ivl) => (ivl.invoiceId = id));
        await transactionalEntityManager.save(createdInvoiceLine);
      })
      .catch((e) => {
        Logger.error(`Somthing happend along the way! `, OrderService.name);
        throw new HttpException(
          `Somthing happend along the way!`,
          HttpStatus.BAD_REQUEST,
        );
      });

    return 'Order sent succesfully!';
  }
}
