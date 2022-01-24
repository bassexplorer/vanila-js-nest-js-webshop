import { CreateCustomerDTO } from './create-customer.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
