import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateCustomerDto } from '../customer/dto/validate-customer.dto';
import { CreateCustomerDTO } from '../customer/dto/create-customer.dto';
import { Customer } from '../customer/entity/customer.entity';
import { JwtPayload } from './jwt-payload.dto';
import { CustomersService } from '../customer/customers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomersService,
  ) {}

  async signinLocal(dto: ValidateCustomerDto) {
    const user = await Customer.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Cridentials incorrect!');

    const isPasswordRight = await user.comparePassword(dto.password);

    if (!isPasswordRight)
      throw new UnauthorizedException('Cridentials incorrect!');

    return this.signUser({
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
  }

  signUser(user: JwtPayload) {
    return this.jwtService.sign(user);
  }

  async signupLocal(dto: CreateCustomerDTO) {
    const createdUser = await this.customerService.save(dto);

    return this.signUser({
      id: createdUser.id,
      email: createdUser.email,
      name: `${createdUser.firstName} ${createdUser.lastName}`,
    });
  }
}
