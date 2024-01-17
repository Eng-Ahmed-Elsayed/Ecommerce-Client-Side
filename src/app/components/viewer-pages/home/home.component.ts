import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/shared/product';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AdminService } from '../../dashboard/admin/services/admin.service';
import { CategoryDto } from 'src/app/shared/models/shared/categoryDto';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';
import { ProductParameters } from 'src/app/shared/models/shared/productParameters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Products
  featuredProducts: ProductDto[] | null = [{}, {}, {}];
  newProducts: ProductDto[] | null = [{}, {}, {}];
  recommendedProducts: ProductDto[] | null = [{}, {}, {}];
  // Loaders for produts
  featuredProductsLoading: boolean = true;
  newProductsLoading: boolean = true;
  recommendedProductsLoading: boolean = true;
  // Categories
  categories: CategoryDto[] | null = [{}, {}, {}, {}, {}, {}, {}];
  categoriesLoading: boolean = true;
  //
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  accessoriesResponsiveOptions!: any[];

  constructor(
    private productService: ProductService,
    private photoService: PhotoService,
    private layoutService: LayoutService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.getCategoryList().subscribe({
      next: (res: CartItemDto[]) => {
        this.categories = res.length > 10 ? res.slice(0, 10) : res;
        this.categoriesLoading = false;
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });

    // Product parameters for all request we will just change featured prop
    let productParameters: ProductParameters = {
      pageNumber: 1,
      pageSize: 12,
      name: '',
      orderBy: 'createdAt desc',
      availability: [],
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 20000,
      category: '',
      featured: false,
    };
    // New products
    this.productService.searchAndFilterProducts(productParameters).subscribe({
      next: (res: HttpResponse<ProductDto[]>) => {
        this.newProducts = res.body;
        this.newProductsLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    // Random products
    productParameters.orderBy = 'name';
    this.productService.searchAndFilterProducts(productParameters).subscribe({
      next: (res: HttpResponse<ProductDto[]>) => {
        this.recommendedProducts = res.body;
        this.recommendedProductsLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    // Featured products
    productParameters.featured = true;
    this.productService.searchAndFilterProducts(productParameters).subscribe({
      next: (res: HttpResponse<ProductDto[]>) => {
        this.featuredProducts = res.body;
        this.featuredProductsLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    this.photoService.getGalleriaImages().then((images) => {
      this.images = images;
    });

    this.responsiveOptions = this.layoutService.getResponsiveOptions();

    this.accessoriesResponsiveOptions =
      this.layoutService.getAccessoriesResponsiveOptions();
  }
}
