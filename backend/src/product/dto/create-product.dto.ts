import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO implements Readonly<CreateProductDTO> {
  @IsNotEmpty()
  @IsString()
  partNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  description: string | null;

  @IsNotEmpty()
  @IsNumber()
  productCategoryId: number;

  @IsString()
  imageFile: string | null;
}
