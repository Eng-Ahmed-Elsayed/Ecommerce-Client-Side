import { Component, Input } from '@angular/core';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-shopping-cart-button',
  templateUrl: './shopping-cart-button.component.html',
  styleUrls: ['./shopping-cart-button.component.scss'],
})
export class ShoppingCartButtonComponent {
  @Input() product!: ProductDto;

  constructor(private customerService: CustomerService) {}

  shoppingCartConfirmation = (productId: string) => {
    let cartItem: CartItemDto = {
      quantity: 1,
      productId: productId,
    };
    this.customerService.addCartItem(cartItem);
  };
}
