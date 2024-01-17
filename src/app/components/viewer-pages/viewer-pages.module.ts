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
import { ProductsComponent } from './products/products.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CustomProductColorsComponent } from './custom-product-colors/custom-product-colors.component';
import { CustomProductSizesComponent } from './custom-product-sizes/custom-product-sizes.component';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { AccordionModule } from 'primeng/accordion';
import { SpeedDialModule } from 'primeng/speeddial';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    ViewerPagesComponent,
    HomeComponent,
    ProductsCarouselComponent,
    CustomCarouselComponent,
    CustomDataViewComponent,
    ProductOverviewComponent,
    ProductsComponent,
    CustomProductColorsComponent,
    CustomProductSizesComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqsComponent,
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
    DropdownModule,
    InputTextModule,
    SliderModule,
    PanelModule,
    ScrollPanelModule,
    CheckboxModule,
    SidebarModule,
    ToggleButtonModule,
    CustomComponentsModule,
    InputTextareaModule,
    InputMaskModule,
    AccordionModule,
    SpeedDialModule,
    SkeletonModule,
  ],
  exports: [CustomProductColorsComponent, CustomProductSizesComponent],
})
export class ViewerPagesModule {}
