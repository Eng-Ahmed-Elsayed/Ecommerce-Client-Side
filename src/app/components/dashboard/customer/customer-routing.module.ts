import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'user/address', component: UserAddressComponent },
  { path: 'user/payment', component: UserPaymentComponent },
  { path: 'check-out', component: CheckOutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
