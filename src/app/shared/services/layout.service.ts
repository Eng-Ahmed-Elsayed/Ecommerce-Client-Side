import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  // For navbar conponent
  // If in products page make the breakpoint too large
  // because we will need space for filter(Like price filter and etc).
  private isLarge$ = this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .pipe(
      map((x) => {
        let breakPoint = x.url.startsWith('/products')
          ? '(max-width: 1799.98px)'
          : '(max-width: 1199.98px)';
        return this.breakpointObserver.observe(breakPoint).pipe(
          map((result) => result.matches),
          shareReplay()
        );
      })
    );

  // For sidebars (like filter sidebar).
  isSmall$ = this.breakpointObserver.observe('(max-width: 1199.98px)').pipe(
    map((result) => result.matches),
    shareReplay()
  );

  private responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '855px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
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
      numVisible: 6,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 5,
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

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

  getIsLarge = () => this.isLarge$;
  getIsSmall = () => this.isSmall$;
}
