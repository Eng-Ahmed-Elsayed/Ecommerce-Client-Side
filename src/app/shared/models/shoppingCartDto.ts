import { CartItemDto } from './cartItemDto';

export interface ShoppingCartDto {
  id?: string;
  userId?: string;
  cartItems?: CartItemDto[];
  total?: number;
}
