import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/shared/models/product';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() title: string = 'Popular Products';
  products: Product[] | undefined | any;
  recommendedProducts: Product[] | undefined | any;
  filterBy!: string;
  sortOptions!: SelectItem[];

  constructor(
    private productService: ProductService,
    private photoService: PhotoService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.productService
      .getProducts()
      .then((data) => (this.recommendedProducts = data.slice(0, 12)));

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
      { label: 'Category Ascending', value: 'category' },
      { label: 'Category Descending', value: '!category' },
    ];

    this.filterBy = 'name';
  }
}
