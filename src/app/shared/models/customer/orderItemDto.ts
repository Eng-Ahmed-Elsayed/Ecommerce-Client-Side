import { ProductDto } from '../shared/productDto';

export interface OrderItemsDto {
  id?: string;
  orderDetailsId?: string;
  productId?: string;
  product?: ProductDto;
  quantity?: number;
  price?: number;
  discountCode?: string;
  discountPercent?: number;
}
