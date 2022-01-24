import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { UpdateInvoiceDTO } from './dto/update-invoice.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../auth/user.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  // TODO: Add AuthGuard

  /**
   * Customers can get their all orders
   * Customers can place orders
   * Customers can get order by ID from their orders
   */

  // Only for admins in the future
  // @Get()
  // async getAll() {
  //   return await this.orderService.getAllOrder();
  // }

  // @Get(':invoiceId')
  // async getOneById(@Param('invoiceId') invoiceId: string) {
  //   return this.orderService.getInvoiceById(invoiceId);
  // }

  /////////////////////////////////////////////////////////
  @UseGuards(AuthGuard('jwt'))
  @Get('of-customer')
  async getAllForCustomer(@UserDecorator('id') currentUserId: string) {
    return await this.orderService.getAllOrderByCustomerId(currentUserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('insert')
  async createOrder(
    @Body() order: CreateInvoiceDTO,
    @UserDecorator('id') currentUserId: string,
  ) {
    return this.orderService.createInvoice({
      customerId: currentUserId,
      ...order,
    });
  }

  @Put('update')
  async updateOrder(@Body() order: UpdateInvoiceDTO) {
    // return this.orderService.updateProduct(order);
  }
}
