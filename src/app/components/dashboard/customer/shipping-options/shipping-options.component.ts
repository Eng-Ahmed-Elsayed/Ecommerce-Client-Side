import { Component, OnInit } from '@angular/core';
import { ShippingOptionsDto } from 'src/app/shared/models/shippingOptionsDto';

@Component({
  selector: 'app-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss'],
})
export class ShippingOptionsComponent implements OnInit {
  shippingOptions!: ShippingOptionsDto[];
  shippingMethod!: string;

  ngOnInit(): void {
    this.shippingOptions = [
      {
        method: 'Standard Shipping',
        deliveryTime: '3-5 business days',
        cost: 5.99,
      },
      {
        method: 'Expedited Shipping',
        deliveryTime: '2-3 business days',
        cost: 9.99,
      },
      {
        method: 'Overnight Shipping',
        deliveryTime: '1 business day',
        cost: 19.99,
      },
    ];
  }
}
