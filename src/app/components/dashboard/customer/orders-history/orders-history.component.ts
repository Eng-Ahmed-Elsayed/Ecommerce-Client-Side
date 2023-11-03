import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderDetailsDto } from 'src/app/shared/models/customer/orderDetails';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
})
export class OrdersHistoryComponent implements OnInit {
  orders!: OrderDetailsDto[];

  constructor(
    private customerService: CustomerService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.customerService.getOrders().subscribe({
      next: (res: OrderDetailsDto[]) => {
        this.orders = res;
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);
  inputFilter = (event: Event) => this.utilityService.inputFilter(event);
}
