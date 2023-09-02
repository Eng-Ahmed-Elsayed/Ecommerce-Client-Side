import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // isAnimated = true;
  // itemsPerSlide = 5;
  // singleSlideOffset = true;
  // showIndicators = false;

  // slides = [
  //   {
  //     image: '../../../../assets/images/categories/c-1.avif',
  //     name: 'PCs & Accessories',
  //   },
  //   {
  //     image: '../../../../assets/images/categories/c-2.avif',
  //     name: 'Mobile Phones',
  //   },
  //   {
  //     image: '../../../../assets/images/categories/c-3.avif',
  //     name: 'Televisions',
  //   },
  //   {
  //     image: '../../../../assets/images/categories/c-1.avif',
  //     name: 'PCs & Accessories',
  //   },
  //   {
  //     image: '../../../../assets/images/categories/c-3.avif',
  //     name: 'Televisions',
  //   },
  //   {
  //     image: '../../../../assets/images/categories/c-2.avif',
  //     name: 'Mobile Phones',
  //   },
  // ];

  products: Product[] | undefined | any;

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }
}
