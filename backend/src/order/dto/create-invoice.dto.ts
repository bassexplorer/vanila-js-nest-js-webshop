import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateInvoiceLineDTO } from './create-invoiceline.dto';
import { Invoiceline } from '../entities/invoiceline.entity';

export class CreateInvoiceDTO implements Readonly<CreateInvoiceDTO> {
  @IsNumber()
  @IsNotEmpty()
  invoiceNumber: number;

  @IsBoolean()
  paid: boolean;

  @IsDateString()
  @IsOptional()
  paidDate: Date | null;

  @IsDateString()
  dueDate: Date;

  @IsOptional()
  @IsString()
  comment: string | null;

  @IsString()
  currencyId: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  zipcode: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceLineDTO)
  invoicelines: Invoiceline[];
}
