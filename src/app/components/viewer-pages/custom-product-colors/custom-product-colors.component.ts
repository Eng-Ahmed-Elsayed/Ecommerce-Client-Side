import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-custom-product-colors',
  templateUrl: './custom-product-colors.component.html',
  styleUrls: ['./custom-product-colors.component.scss'],
})
export class CustomProductColorsComponent {
  @Input() colorStateOptions = this.productService.getColors();
  @Input() colorsValue!: string[];
  @Output() colorsValueEmitter = new EventEmitter<string[]>();

  emitColorsValue() {
    this.colorsValueEmitter.emit(this.colorsValue);
  }

  constructor(private productService: ProductService) {}
}
