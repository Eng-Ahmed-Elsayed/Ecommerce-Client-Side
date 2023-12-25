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
  products!: ProductDto[] | undefined | any;
  caregories!: CategoryDto[] | undefined | any;
  recommendedProducts!: Product[] | undefined | any;
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
        this.caregories = res.length > 10 ? res.slice(0, 10) : res;
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });

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
    };
    this.productService.searchAndFilterProducts(productParameters).subscribe({
      next: (res: HttpResponse<ProductDto[]>) => {
        this.products = res.body;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    // this.productService.getProductList().subscribe({
    //   next: (res: ProductDto[]) => {
    //     this.products = res;
    //   },
    //   error: (err: HttpErrorResponse) => console.log(err.message),
    // });

    this.photoService.getGalleriaImages().then((images) => {
      this.images = images;
    });

    this.responsiveOptions = this.layoutService.getResponsiveOptions();

    this.accessoriesResponsiveOptions =
      this.layoutService.getAccessoriesResponsiveOptions();

    this.productService
      .getProducts()
      .then((data) => (this.recommendedProducts = data.slice(0, 12)));
  }
}
