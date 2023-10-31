import { Component, Input, OnInit } from '@angular/core';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';
import { OrderItemsDto } from 'src/app/shared/models/customer/orderItemDto';
import { createImgPath } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  @Input() cartItems!: CartItemDto[] | undefined;
  @Input() shippingCost: number = 0;
  @Input() subTotal!: number | undefined;
  @Input() total!: number | undefined;

  createImgPath = (cartItem: CartItemDto | undefined) => {
    return cartItem?.product?.productImages !== undefined
      ? createImgPath(cartItem.product?.productImages[0].imgPath)
      : '';
  };
}
