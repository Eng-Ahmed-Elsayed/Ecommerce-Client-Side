import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent {
  @Input() products!: Product[];
  @Input() numVisible: number = 3;
  @Input() responsiveOptions = this.layoutService.getResponsiveOptions();
  constructor(
    private layoutService: LayoutService,
    private customOverlayService: CustomOverlayService
  ) {}

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }
  shopCartConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to add this item to your cart?'
    );
  favouritConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to add this item to your favorites?'
    );
}
