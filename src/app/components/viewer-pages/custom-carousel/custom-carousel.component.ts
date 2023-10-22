import { Component, Input } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { createImgPath } from 'src/app/shared/services/photo.service';

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
  constructor(private layoutService: LayoutService) {}

  createImgPath = (imgPath: string) => createImgPath(imgPath);
}
