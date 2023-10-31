import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/shared/models/shared/product';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() title: string = 'Popular Products';
  products: Product[] | undefined | any;
  recommendedProducts: Product[] | undefined | any;
  filterBy!: string;
  sortOptions!: SelectItem[];
  visible: boolean = false;

  // priceFilter
  priceRangeValues: number[] = [0, 9999];

  // From API
  categoryList: any[] = [
    'Category1',
    'Category2',
    'Category3',
    'Category4',
    'Category5',
    'Category6',
    'Category7',
    'Category8',
    'Category9',
    'Category10',
  ];
  categories!: any[];
  showAllCategories: boolean = false;

  colorStateOptions = this.productService.getColors();

  constructor(
    private productService: ProductService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.productService
      .getProducts()
      .then((data) => (this.recommendedProducts = data.slice(0, 24)));

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
      { label: 'Category Ascending', value: 'category' },
      { label: 'Category Descending', value: '!category' },
    ];
    this.filterBy = 'name';
    this.categories = this.categoryList.slice(0, 5);
  }

  toggleShowAllCategories() {
    this.showAllCategories = !this.showAllCategories;
    this.categories = this.showAllCategories
      ? [...this.categoryList]
      : this.categoryList.slice(0, 5);
  }
}
