import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerPagesComponent } from './viewer-pages.component';
import { HomeComponent } from './home/home.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-overview', component: ProductOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewerPagesRoutingModule {}
