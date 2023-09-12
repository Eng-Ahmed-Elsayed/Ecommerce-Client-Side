import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [CustomerComponent, ShoppingCartComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
})
export class CustomerModule {}
