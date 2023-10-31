import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAddressDto } from 'src/app/shared/models/customer/userAddressDto';

@Component({
  selector: 'app-user-address-selection',
  templateUrl: './user-address-selection.component.html',
  styleUrls: ['./user-address-selection.component.scss'],
})
export class UserAddressSelectionComponent {
  @Input() userAddresses!: UserAddressDto[];
  @Output() selectedAddressEvent = new EventEmitter<UserAddressDto>();
  isSelected: boolean = false;
  constructor() {}

  selectAddress(value: UserAddressDto) {
    this.isSelected = false ? value != null : true;
    this.selectedAddressEvent.emit(value);
  }
}
