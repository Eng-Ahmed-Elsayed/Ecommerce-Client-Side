import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CartItemDto } from 'src/app/shared/models/cartItemDto';
import { ProductDto } from 'src/app/shared/models/productDto';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent {
  @Input() products!: ProductDto[];
  @Input() numVisible: number = 3;
  @Input() responsiveOptions = this.layoutService.getResponsiveOptions();
  constructor(
    private layoutService: LayoutService,
    private customOverlayService: CustomOverlayService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  getSeverity = (product: ProductDto) =>
    this.productService.getSeverity(product);

  shopCartConfirm = (productId: string) => {
    let cartItem: CartItemDto = {
      quantity: 1,
      productId: productId,
    };
    this.customerService.addCartItem(cartItem);
  };

  // shopCartConfirm = () =>
  //   this.customOverlayService.confirmDialog(
  //     'Are you sure that you want to add this item to your cart?'
  //   );
  favouritConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to add this item to your favorites?'
    );

  createImgPath = (imgPath: string) => createImgPath(imgPath);
}
