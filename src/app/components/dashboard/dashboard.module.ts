import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    CustomerComponent,
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
})
export class DashboardModule {}
