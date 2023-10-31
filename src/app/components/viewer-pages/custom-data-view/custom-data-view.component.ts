import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/shared/models/shared/product';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-custom-data-view',
  templateUrl: './custom-data-view.component.html',
  styleUrls: ['./custom-data-view.component.scss'],
})
export class CustomDataViewComponent implements OnInit {
  @Input() products!: Product[];
  @Input() paginator: boolean = false;
  @Input() sortOptions!: SelectItem[];
  @Input() filterBy!: string;
  @Input() rows: number = 6;
  sortField!: string;
  sortOrder!: number;
  sortKey!: string;

  layout: string = 'list';
  // gridLayoutContainer!: Element;
  constructor(
    private productService: ProductService,
    private customOverlayService: CustomOverlayService
  ) {}

  ngOnInit(): void {
    // Add class row to the grid layout container(To solve the conflict between bootstrap and primeflex )
    // document.getElementsByClassName('grid-nogutter')[0].classList.add('row');
  }
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  shopCartConfirm = () =>
    this.customOverlayService.confirmDialog(
      'Are you sure that you want to add this item to your cart?'
    );
  getSeverity = (product: ProductDto) =>
    this.productService.getSeverity(product);

  inputFilter(event: Event) {
    return (event.target as HTMLTextAreaElement)?.value;
  }

  //   clear(dataView: DataView) {
  //     dataView.;
  // }
}
