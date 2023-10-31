import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShippingOptionDto } from 'src/app/shared/models/shared/shippingOptionDto';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss'],
})
export class ShippingOptionsComponent {
  @Input() shippingOptions!: ShippingOptionDto[];
  @Output() selectedShippingOptionEvent = new EventEmitter<ShippingOptionDto>();
  selectedOption!: ShippingOptionDto;
  isSelected: boolean = false;

  selectShippingOption(value: ShippingOptionDto) {
    this.isSelected = false ? value != null : true;
    this.selectedShippingOptionEvent.emit(value);
  }
}
