import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';
import { DiscountDto } from 'src/app/shared/models/shared/discountDto';
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
  // Discount code Emitter
  @Input() discount: DiscountDto | null = null;
  @Output() addDicountCodeEvent = new EventEmitter<string>();
  dicountCode: string = '';
  oldDicountCode: string = '';

  addDiscountCode() {
    // Make sure it is a vaild code and not the same
    if (
      this.dicountCode.length == 6 &&
      this.oldDicountCode != this.dicountCode
    ) {
      this.addDicountCodeEvent.emit(this.dicountCode);
      this.oldDicountCode = this.dicountCode;
    } else if (this.discount != null) {
      this.oldDicountCode = '';
      this.addDicountCodeEvent.emit('');
    }
  }

  createImgPath = (cartItem: CartItemDto | undefined) => {
    return cartItem?.product?.productImages !== undefined
      ? createImgPath(cartItem.product?.productImages[0].imgPath)
      : '';
  };
}
