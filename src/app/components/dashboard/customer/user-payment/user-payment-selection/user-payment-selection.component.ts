import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserPaymentDto } from 'src/app/shared/models/customer/userPaymentDto';

@Component({
  selector: 'app-user-payment-selection',
  templateUrl: './user-payment-selection.component.html',
  styleUrls: ['./user-payment-selection.component.scss'],
})
export class UserPaymentSelectionComponent {
  @Input() userPayments!: UserPaymentDto[];
  @Output() selectedPaymentEvent = new EventEmitter<UserPaymentDto>();
  isSelected: boolean = false;

  selectPayment(value: UserPaymentDto) {
    this.isSelected = false ? value != null : true;
    this.selectedPaymentEvent.emit(value);
  }
}
