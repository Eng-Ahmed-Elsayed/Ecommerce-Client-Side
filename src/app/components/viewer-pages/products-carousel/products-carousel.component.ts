import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/shared/product';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent {
  @Input() products!: ProductDto[] | any;
  @Input() numVisible: number = 3;
  @Input() responsiveOptions = this.layoutService.getResponsiveOptions();
  @Input() loading!: boolean;

  constructor(
    private layoutService: LayoutService,
    private customOverlayService: CustomOverlayService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  getSeverity = (product: ProductDto) =>
    this.productService.getSeverity(product);

  shoppingCartConfirmation = (productId: string) => {
    let cartItem: CartItemDto = {
      quantity: 1,
      productId: productId,
    };
    this.customerService.addCartItem(cartItem);
  };

  // shoppingCartConfirmation = () =>
  //   this.customOverlayService.confirmDialog(
  //     'Are you sure that you want to add this item to your cart?'
  //   );
  favouritConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to add this item to your check list?'
    );

  createImgPath = (imgPath: string) => createImgPath(imgPath);
}
