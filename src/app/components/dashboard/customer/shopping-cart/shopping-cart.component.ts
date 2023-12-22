import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { CustomerService } from '../../../../shared/services/customer.service';
import { ShoppingCartDto } from 'src/app/shared/models/customer/shoppingCartDto';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  @Input() isSidebar: boolean = false;
  @Input() cartItems!: CartItemDto[] | undefined;
  total!: number | undefined;
  loading: boolean = true;

  // Flag to track if there is a new changes if Qty for any item.
  isChange: boolean = false;

  private breakpointObserver = inject(BreakpointObserver);
  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 574.98px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.customerService.cartReview().subscribe({
      next: (res: ShoppingCartDto) => {
        this.total = res.total;
        this.cartItems = res.cartItems;
        this.loading = false;
      },
    });
  }

  DeleteCartItemConfirm = (id: string) =>
    this.confirmationService.confirm({
      message: 'Do you want to delete this item from your cart?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.deleteCartItem(id).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Deleted successfully',
              detail:
                'You have deleted the product from your cart successfully.',
            });
            this.cartItems = this.cartItems?.filter((x) => x.id != id);
            this.updateTotal();
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to delete.',
              detail: 'Failed to delete the product form your cart.',
            });
            console.log(err);
          },
        });
      },
    });

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  // Track the quantity and update if change
  onQtyInput(event: InputNumberInputEvent, cartItem: CartItemDto) {
    let q = parseInt(event.value);
    if (!Number.isNaN(q) && cartItem.quantity != q) {
      cartItem.quantity = q < 100 ? q : 1;
      if (cartItem.product?.price != undefined) {
        cartItem.price = cartItem.quantity * cartItem.product.price;
      }
      this.isChange = true;
    }
  }
  onQtyInputBlur(event: Event, cartItem: CartItemDto) {
    // Make the API call only if there is a change
    if (this.isChange) {
      this.customerService.updateCartItem(cartItem).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Updated successfully',
            detail: 'You have updated the product in your cart successfully.',
          });
          this.cartItems?.map((x) => {
            if (x.id == cartItem.id) {
              if (
                cartItem.quantity != undefined &&
                cartItem.product?.price != undefined
              ) {
                cartItem.price = cartItem.quantity * cartItem.product.price;
                this.updateTotal();

                return cartItem;
              }
            }
            return x;
          });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to update.',
            detail: 'Failed to update the product in your cart.',
          });
          console.log(err);
        },
      });
      this.isChange = false;
    }
  }
  // Update the total after the user change the qty or delete item(later after he uses discount code).
  updateTotal() {
    this.total = this.cartItems
      ?.map((x) => x.price)
      .reduce((a, b) => a! + b!, 0);
    console.log(this.total);
  }
}
