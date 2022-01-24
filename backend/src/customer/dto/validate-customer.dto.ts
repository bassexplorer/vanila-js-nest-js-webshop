import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateCustomerDto implements Readonly<ValidateCustomerDto> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
