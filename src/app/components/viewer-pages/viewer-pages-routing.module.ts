import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerPagesComponent } from './viewer-pages.component';
import { HomeComponent } from './home/home.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-overview', component: ProductOverviewComponent },
  { path: 'product-list', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewerPagesRoutingModule {}
