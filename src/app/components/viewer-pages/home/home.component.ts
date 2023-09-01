import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // isAnimated = true;
  itemsPerSlide = 5;
  singleSlideOffset = true;
  showIndicators = false;

  slides = [
    {
      image: '../../../../assets/images/categories/c-1.avif',
      name: 'PCs & Accessories',
    },
    {
      image: '../../../../assets/images/categories/c-2.avif',
      name: 'Mobile Phones',
    },
    {
      image: '../../../../assets/images/categories/c-3.avif',
      name: 'Televisions',
    },
    {
      image: '../../../../assets/images/categories/c-1.avif',
      name: 'PCs & Accessories',
    },
    {
      image: '../../../../assets/images/categories/c-3.avif',
      name: 'Televisions',
    },
    {
      image: '../../../../assets/images/categories/c-2.avif',
      name: 'Mobile Phones',
    },
  ];
}
