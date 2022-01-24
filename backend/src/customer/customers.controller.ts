import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../auth/user.decorator';
import { CustomersService } from './customers.service';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Controller('customer')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  // Needed endpoints
  // Get user by ID
  // Update user by ID
  // create user (register) in AuthController

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getLogedInUser(@UserDecorator('id') currentUserId: string) {
    return await this.customerService.getUserById(currentUserId);
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async updateUserById(
    @Body() customer: UpdateCustomerDTO,
    @UserDecorator('id') currentUserId: string,
  ) {
    return await this.customerService.update(currentUserId, customer);
  }
}
