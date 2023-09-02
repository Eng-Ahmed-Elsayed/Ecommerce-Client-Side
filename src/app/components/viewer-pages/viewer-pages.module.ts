import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerPagesRoutingModule } from './viewer-pages-routing.module';
import { ViewerPagesComponent } from './viewer-pages.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as PrimeCarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ViewerPagesComponent, HomeComponent],
  imports: [
    CommonModule,
    ViewerPagesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CarouselModule,
    // PrimeNg
    PrimeCarouselModule,
    TagModule,
    ButtonModule,
  ],
})
export class ViewerPagesModule {}
