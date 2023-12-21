import { ProductDto } from './productDto';

export interface DiscountDto {
  id?: string;
  name?: string;
  code?: string;
  discountPercent?: number;
  isActive?: boolean;
  products?: ProductDto[];
  otherProducts?: ProductDto[];
  newProducts?: ProductDto[];
}
