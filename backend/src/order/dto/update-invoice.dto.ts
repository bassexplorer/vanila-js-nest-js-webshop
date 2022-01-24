import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceDTO } from './create-invoice.dto';
export class UpdateInvoiceDTO extends PartialType(CreateInvoiceDTO) {}
