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
  loading: boolean = true;

  constructor(
    private customerService: CustomerService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.customerService.getOrders().subscribe({
      next: (res: OrderDetailsDto[]) => {
        this.orders = res.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        // Set price and priceBeforeDiscount if this order item has a discount.
        this.orders.forEach((o) => {
          if (o.discountCode != null) {
            o.orderItems?.forEach((i) => {
              if (i.discountPercent != null && i.product != undefined) {
                i.product.priceBeforeDiscount = i.product?.price;
                i.product.price = i.product?.price! * (1 - i.discountPercent);
              }
            });
          }
        });
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);
  inputFilter = (event: Event) => this.utilityService.inputFilter(event);
}
