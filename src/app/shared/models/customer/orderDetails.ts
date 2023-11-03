import { OrderItemsDto } from './orderItemDto';

export interface OrderDetailsDto {
  id?: string;
  userId?: string;
  orderItems?: OrderItemsDto[];
  total?: number;
  shippingOptionId?: string;
  userAddressId?: string;
  userPaymentId?: string;
  createdAt?: Date;
}
