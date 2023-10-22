import { Component, OnInit } from '@angular/core';
import { CartItemDto } from 'src/app/shared/models/cartItemDto';
import { Product } from 'src/app/shared/models/product';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { ProductDto } from 'src/app/shared/models/productDto';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../dashboard/admin/services/admin.service';
import { CategoryDto } from 'src/app/shared/models/categoryDto';

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
        this.caregories = res;
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });

    this.productService.getProductList().subscribe({
      next: (res: ProductDto[]) => {
        this.products = res;
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });

    this.photoService.getImages().then((images) => {
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
