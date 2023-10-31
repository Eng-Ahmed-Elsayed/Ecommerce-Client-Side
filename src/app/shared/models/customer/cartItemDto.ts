import { ProductDto } from '../shared/productDto';

export interface CartItemDto {
  id?: string;
  shoppingCartId?: string;
  productId?: string;
  product?: ProductDto;
  quantity?: number;
  price?: number;
}
