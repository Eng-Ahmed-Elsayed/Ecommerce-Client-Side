import { Component, Input } from '@angular/core';
import { UserAddressDto } from 'src/app/shared/models/customer/userAddressDto';
import { UserPaymentDto } from 'src/app/shared/models/customer/userPaymentDto';
import { ShippingOptionDto } from 'src/app/shared/models/shared/shippingOptionDto';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent {
  @Input() selectedAddress!: UserAddressDto;
  @Input() selectedShippingOption!: ShippingOptionDto;
  @Input() selectedPaymentOption!: UserPaymentDto;
  @Input() total!: number | undefined;
}
