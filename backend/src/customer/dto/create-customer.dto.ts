import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDTO implements Readonly<CreateCustomerDTO> {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  address: string | null;

  @IsOptional()
  @IsString()
  zipcode: string | null;

  @IsOptional()
  @IsString()
  country: string | null;

  @IsOptional()
  @IsString()
  phone: string | null;

  @IsOptional()
  @IsString()
  city: string | null;
}
