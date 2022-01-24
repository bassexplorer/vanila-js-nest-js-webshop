import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateCustomerDto } from '../customer/dto/validate-customer.dto';
import { CreateCustomerDTO } from '../customer/dto/create-customer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signin')
  async signinLocal(@Body() dto: ValidateCustomerDto) {
    return await this.authService.signinLocal(dto);
  }

  @Post('local/signup')
  async signupLocal(@Body() dto: CreateCustomerDTO) {
    return await this.authService.signupLocal(dto);
  }
}
