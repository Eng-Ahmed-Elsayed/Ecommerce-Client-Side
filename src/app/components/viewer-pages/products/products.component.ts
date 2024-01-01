import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { SliderSlideEndEvent } from 'primeng/slider';
import { Observable, Subscription } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/shared/categoryDto';
import { Pagination } from 'src/app/shared/models/shared/pagination';
import { Product } from 'src/app/shared/models/shared/product';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { ProductParameters } from 'src/app/shared/models/shared/productParameters';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() title: string = 'Popular Products';
  products!: ProductDto[] | null;
  recommendedProducts: Product[] | undefined | any;

  // Layout for fliter sidebar
  isSmall!: boolean;
  sidebarVisible: boolean = false;

  // filterBy: string = 'name';
  sortOptions!: SelectItem[];
  visible: boolean = false;

  // Pagination
  pagination!: Pagination;
  rows: number = 9;
  currentPage: number = 1;
  loading!: boolean;
  isFirstCall: boolean = true;
  // Filters
  nameFilter: string | null = '';
  availabilityFilter: string[] | null = [];
  colorsFilter: string[] | null = [];
  sizesFilter: string[] | null = [];
  priceRangeFliter: number[] = [0.01, 20000];
  categoryFilter: string | null = '';

  // Order
  orderBy: string | null = '';

  // Categories
  categoryList!: CategoryDto[];
  categories!: CategoryDto[];
  showAllCategories: boolean = false;

  colorStateOptions = this.productService.getColors();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.nameFilter = params['name'] != undefined ? params['name'] : '';
      this.categoryFilter =
        params['category'] != undefined ? params['category'] : '';
      this.orderBy = params['orderBy'] != undefined ? params['orderBy'] : '';
      this.searchAndFilterProducts();
    });

    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categoryList = res;
        this.categories = this.categoryList.slice(0, 5);
      },
      error: (err) => console.log(err),
    });

    this.sortOptions = [
      { label: 'Name Ascending', value: 'name' },
      { label: 'Name Descending', value: 'name desc' },
      { label: 'Price High to Low', value: 'price desc' },
      { label: 'Price Low to High', value: 'price' },
      // { label: 'Rating High to Low', value: 'AvgRating desc' },
      // { label: 'Rating Low to High', value: 'AvgRating' },
    ];

    // If the screen is small or no
    this.layoutService.isSmall$.subscribe((res) => {
      if (this.isSmall != res) {
        this.sidebarVisible = false;
        this.isSmall = res;
      }
    });
  }

  toggleShowAllCategories() {
    this.showAllCategories = !this.showAllCategories;
    this.categories = this.showAllCategories
      ? [...this.categoryList]
      : this.categoryList.slice(0, 5);
  }

  // Call the api to apply the filters.
  searchAndFilterProducts() {
    this.loading = true;
    let productParameters: ProductParameters = {
      pageNumber: this.currentPage,
      pageSize: this.rows,
      name: this.nameFilter,
      orderBy: this.orderBy,
      availability: this.availabilityFilter,
      colors: this.colorsFilter,
      sizes: this.sizesFilter,
      minPrice: this.priceRangeFliter[0],
      maxPrice: this.priceRangeFliter[1],
      category: this.categoryFilter,
    };
    this.productService.searchAndFilterProducts(productParameters).subscribe({
      next: (res: HttpResponse<ProductDto[]>) => {
        this.pagination = JSON.parse(
          res.headers.get('X-Pagination')!
        ) as Pagination;
        this.products = res.body;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // Price Slider event handler
  priceSliderEnd(event: SliderSlideEndEvent) {
    this.searchAndFilterProducts();
  }

  // Genaric event handler
  inputEventHandler(event: any) {
    this.searchAndFilterProducts();
  }

  // Add colors form the output of the custom colors component,
  // then call the api
  colorsEventHandler(colorsValue: string[]) {
    this.colorsFilter = colorsValue;
    this.searchAndFilterProducts();
  }

  // Add Sizes form the output of the custom sizes component
  // then call the api
  sizesEventHandler(sizesValue: string[]) {
    this.sizesFilter = sizesValue;
    this.searchAndFilterProducts();
  }

  // Get current page from the custom data view component
  // Will not call the searchAndFilterProducts if it's the
  // first call to prevent making 2 calls int the same time
  // (the other call from activatedRoute.queryParams.subscribe).
  getCurrentPage(val: number) {
    this.currentPage = val;
    if (this.isFirstCall) {
      this.isFirstCall = false;
    } else {
      this.searchAndFilterProducts();
    }
  }
  // Set visible value for sidebar filter.
  setFilterSideVisibleValue(val: boolean) {
    this.sidebarVisible = val;
  }

  filterByCategory = (category: string) => {
    // If you click the same category disable the filter(like a toggle).
    if (this.categoryFilter != category) {
      this.categoryFilter = category;
    } else {
      this.categoryFilter = '';
    }
    this.searchAndFilterProducts();
  };
}
