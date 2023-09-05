import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-custom-data-view',
  templateUrl: './custom-data-view.component.html',
  styleUrls: ['./custom-data-view.component.scss'],
})
export class CustomDataViewComponent implements OnInit {
  @Input() products!: Product[];
  layout: string = 'list';
  // gridLayoutContainer!: Element;
  constructor(
    private productService: ProductService,
    private customOverlayService: CustomOverlayService
  ) {}

  ngOnInit(): void {
    // Add class row to the grid layout container(To solve the conflict between bootstrap and primeflex )
    document.getElementsByClassName('grid-nogutter')[0].classList.add('row');
  }
  shopCartConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to add this item to your cart?'
    );
  getSeverity = (product: Product) => this.productService.getSeverity(product);
}
