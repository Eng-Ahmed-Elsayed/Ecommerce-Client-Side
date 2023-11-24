import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { getWatchListItemsResolver } from 'src/app/shared/guards/customer.guard';

const routes: Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'address', component: UserAddressComponent },
  { path: 'payment', component: UserPaymentComponent },
  { path: 'orders-history', component: OrdersHistoryComponent },
  { path: 'check-out', component: CheckOutComponent },
  {
    path: 'watchlist',
    component: WatchListComponent,
    resolve: { watchListItems: getWatchListItemsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
