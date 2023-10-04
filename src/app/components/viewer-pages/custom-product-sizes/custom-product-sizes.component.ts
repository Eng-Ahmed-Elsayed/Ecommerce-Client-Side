import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-custom-product-sizes',
  templateUrl: './custom-product-sizes.component.html',
  styleUrls: ['./custom-product-sizes.component.scss'],
})
export class CustomProductSizesComponent {
  @Input() sizeStateOptions = this.productService.getSizes();
  @Input() sizesValue!: string[];
  @Input() multiple: boolean = true;
  @Output() sizesValueEmitter = new EventEmitter<string[]>();

  emitSizesValue() {
    this.sizesValueEmitter.emit(this.sizesValue);
  }

  constructor(private productService: ProductService) {}
}
