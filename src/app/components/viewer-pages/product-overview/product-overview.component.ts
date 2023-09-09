import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  orderForm!: FormGroup;
  images: any[] | undefined;
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.photoService
      .getImages()
      .then((images: any[]) => (this.images = images.slice(0, 4)));
    this.orderForm = this.fb.group({
      color: [],
      size: [],
      quantity: [],
    });
  }
}
