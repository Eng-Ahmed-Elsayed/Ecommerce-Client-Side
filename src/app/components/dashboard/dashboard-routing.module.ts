import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
