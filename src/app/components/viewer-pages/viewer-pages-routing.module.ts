import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductsComponent } from './products/products.component';
import { getProductResolver } from 'src/app/shared/guards/product.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'product/:id',
    component: ProductOverviewComponent,
    resolve: { product: getProductResolver },
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  { path: 'products/:filter', component: ProductsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewerPagesRoutingModule {}
