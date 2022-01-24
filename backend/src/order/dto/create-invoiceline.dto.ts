import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceLineDTO implements Readonly<CreateInvoiceLineDTO> {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsString()
  lineText: string;

  @IsNumber()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
