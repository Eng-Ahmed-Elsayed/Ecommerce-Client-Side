import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { CheckOutComponent } from './check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomComponentsModule } from '../../custom-components/custom-components.module';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';

@NgModule({
  declarations: [
    CustomerComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    UserAddressComponent,
    UserPaymentComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ScrollPanelModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule,
    DropdownModule,
    CheckboxModule,
    CardModule,
    InputMaskModule,
  ],
  exports: [ShoppingCartComponent],
})
export class CustomerModule {}
