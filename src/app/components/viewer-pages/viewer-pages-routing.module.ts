import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductsComponent } from './products/products.component';
import { getProductResolver } from 'src/app/shared/guards/product.guard';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewerPagesRoutingModule {}
