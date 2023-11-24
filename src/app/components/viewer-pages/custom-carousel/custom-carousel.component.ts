import { Component, Input } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/shared/categoryDto';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
})
export class CustomCarouselComponent {
  @Input() items!: CategoryDto[] | any[];
  @Input() imgClass!: string;
  @Input() withName: boolean = false;
  responsiveOptions = this.layoutService.getCustomCarouselResponsiveOptions();
  constructor(
    private layoutService: LayoutService,
    private productService: ProductService
  ) {}

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  filterByCategory = (category: string) =>
    this.productService.filterByCategory(category);
}
