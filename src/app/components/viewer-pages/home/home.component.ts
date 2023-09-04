import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] | undefined | any;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  accessoriesResponsiveOptions!: any[];

  constructor(
    private productService: ProductService,
    private photoService: PhotoService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.photoService.getImages().then((images) => {
      this.images = images;
    });

    this.responsiveOptions = this.layoutService.getResponsiveOptions();
    this.accessoriesResponsiveOptions =
      this.layoutService.getAccessoriesResponsiveOptions();
  }
}
