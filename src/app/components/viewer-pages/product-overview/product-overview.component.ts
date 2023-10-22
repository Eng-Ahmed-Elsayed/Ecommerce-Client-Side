import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/shared/models/productDto';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CartItemDto } from 'src/app/shared/models/cartItemDto';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  orderForm!: FormGroup;
  product!: ProductDto;
  images: any[] | undefined;
  // images2: any[] | undefined;
  responsiveOptions = this.layoutService.getGalleriaResponsiveOptions();
  // From the api
  ratingValue: number = 4;
  colorStateOptions: any[] = [
    { productColor: 'dark-gray', value: 'darkGray' },
    { productColor: 'green', value: 'green' },
    { productColor: 'blue', value: 'blue' },
  ];
  sizeStateOptions: any[] = [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
  ];

  constructor(
    private layoutService: LayoutService,
    private photoService: PhotoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    // this.photoService.getImages().then((images: any[]) => {
    //   console.log(images.slice(0, 4));
    //   this.images = images.slice(0, 4);
    // });
    this.orderForm = this.fb.group({
      // color: [],
      // size: [],
      quantity: ['1'],
    });
    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.product = data.product;
        this.images = this.photoService.getGalleriaProductImage(
          this.product.productImages!,
          this.product.name!
        );
      },
    });
  }
  addCartItem() {
    let cartItem: CartItemDto = this.orderForm.getRawValue();
    cartItem.productId = this.product.id;
    this.customerService.addCartItem(cartItem);
  }
}
