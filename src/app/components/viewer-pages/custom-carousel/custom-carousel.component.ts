import { Component, Input } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
})
export class CustomCarouselComponent {
  @Input() items!: any[];
  @Input() imgClass!: string;
  @Input() withName: boolean = false;
  responsiveOptions = this.layoutService.getResponsiveOptions();
  constructor(private layoutService: LayoutService) {}
}
