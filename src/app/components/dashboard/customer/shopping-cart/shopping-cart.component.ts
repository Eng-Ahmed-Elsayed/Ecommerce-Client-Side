import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  products!: Product[];
  private breakpointObserver = inject(BreakpointObserver);
  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 574.98px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private productService: ProductService,
    private customOverlayService: CustomOverlayService
  ) {}

  ngOnInit(): void {
    this.productService.getProductsSmall().then((products) => {
      this.products = products.slice(0, 3);
    });
  }
  DeleteCartItemConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to remove this item from your cart?'
    );
}
