import { ProductDto } from './productDto';

export interface DiscountDto {
  id?: string;
  name?: string;
  discountPercent?: number;
  isActive?: boolean;
  products?: ProductDto[];
  otherProducts?: ProductDto[];
  newProducts?: ProductDto[];
}
