import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerPagesRoutingModule } from './viewer-pages-routing.module';
import { ViewerPagesComponent } from './viewer-pages.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { LayoutModule } from '../layout/layout.module';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';

@NgModule({
  declarations: [ViewerPagesComponent, HomeComponent, ProductsCarouselComponent, CustomCarouselComponent],
  imports: [
    CommonModule,
    ViewerPagesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    LayoutModule,
    // PrimeNg
    CarouselModule,
    TagModule,
    ButtonModule,
    GalleriaModule,
    ImageModule,
    BadgeModule,
  ],
})
export class ViewerPagesModule {}
