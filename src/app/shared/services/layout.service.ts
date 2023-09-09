import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  private accessoriesResponsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 2,
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

  private customCarouselResponsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 8,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 7,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  private galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 4,
    },
    {
      breakpoint: '560px',
      numVisible: 4,
    },
  ];

  constructor() {}

  getResponsiveOptions() {
    return this.responsiveOptions;
  }
  getAccessoriesResponsiveOptions() {
    return this.accessoriesResponsiveOptions;
  }
  getCustomCarouselResponsiveOptions() {
    return this.customCarouselResponsiveOptions;
  }
  getGalleriaResponsiveOptions() {
    return this.galleriaResponsiveOptions;
  }
}
