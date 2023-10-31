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
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ShippingOptionsComponent } from './shipping-options/shipping-options.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { UserAddressFormComponent } from './user-address/user-address-form/user-address-form.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { UserAddressSelectionComponent } from './user-address/user-address-selection/user-address-selection.component';
import { UserPaymentFormComponent } from './user-payment/user-payment-form/user-payment-form.component';
import { UserPaymentSelectionComponent } from './user-payment/user-payment-selection/user-payment-selection.component';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    CustomerComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    UserAddressComponent,
    UserPaymentFormComponent,
    UserPaymentComponent,
    OrderConfirmationComponent,
    ShippingOptionsComponent,
    UserAddressFormComponent,
    OrderSummaryComponent,
    UserAddressSelectionComponent,
    UserPaymentSelectionComponent,
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
    TableModule,
    TabMenuModule,
    StepsModule,
  ],
  exports: [ShoppingCartComponent],
})
export class CustomerModule {}
