import { ProductDto } from '../shared/productDto';

export interface OrderItemsDto {
  id?: string;
  orderDetailstId?: string;
  productId?: string;
  product?: ProductDto;
  quantity?: number;
  price?: number;
}
