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
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { CustomDataViewComponent } from './custom-data-view/custom-data-view.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    ViewerPagesComponent,
    HomeComponent,
    ProductsCarouselComponent,
    CustomCarouselComponent,
    CustomDataViewComponent,
    ProductOverviewComponent,
  ],
  imports: [
    CommonModule,
    ViewerPagesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    LayoutModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    GalleriaModule,
    ImageModule,
    BadgeModule,
    DataViewModule,
    RatingModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    TabViewModule,
  ],
})
export class ViewerPagesModule {}
