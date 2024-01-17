import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';
import { OrderDetailsDto } from 'src/app/shared/models/customer/orderDetails';
import { ShoppingCartDto } from 'src/app/shared/models/customer/shoppingCartDto';
import { UserAddressDto } from 'src/app/shared/models/customer/userAddressDto';
import { UserPaymentDto } from 'src/app/shared/models/customer/userPaymentDto';
import { Country } from 'src/app/shared/models/shared/country';
import { DiscountDto } from 'src/app/shared/models/shared/discountDto';
import { Product } from 'src/app/shared/models/shared/product';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { ShippingOptionDto } from 'src/app/shared/models/shared/shippingOptionDto';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  // Add a guard to make the user cant access it if he has not items in his shopping cart.
  // Steps items
  stepsItems: MenuItem[] | undefined;
  activeIndex: number = 0;
  // Have to put this in the form before the API call.
  // The items in the order get it from the cart
  cartItems!: CartItemDto[] | undefined;
  tempCartItems!: CartItemDto[] | undefined;
  subTotal!: number | undefined;
  total!: number | undefined;

  // User address
  userAddresses!: UserAddressDto[];
  selectedAddress!: UserAddressDto;
  // Shipping options
  shippingOptions!: ShippingOptionDto[];
  selectedShippingOption!: ShippingOptionDto;
  shippingCost: number = 0;
  // User payments
  userPayments!: UserPaymentDto[];
  selectedPayment!: UserPaymentDto;
  // Discount code
  discountCode: string = '';
  discount: DiscountDto | null = null;
  // Error flag to disable Next and Continue if the user did not select an option.
  isSelected: boolean = true;

  constructor(
    private messageService: MessageService,
    private utilityService: UtilityService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.stepsItems = [
      {
        label: 'Address',
        command: () => {
          this.activeIndex = 0;
        },
      },
      {
        label: 'Shipping Method',
        command: () => {
          this.activeIndex = 1;
        },
      },
      {
        label: 'Payment',
        command: () => {
          this.activeIndex = 2;
        },
      },
      {
        label: 'Confirmation',
        command: () => {
          this.activeIndex = 3;
        },
      },
    ];

    // Order Details Summary
    this.customerService.cartReview().subscribe({
      next: (res: ShoppingCartDto) => {
        this.cartItems = [...res.cartItems!];
        this.subTotal = res.total;
        this.total = res.total;
      },
    });

    // Shipping Options
    this.customerService.getShippingOptionList().subscribe({
      next: (res: ShippingOptionDto[]) => {
        this.shippingOptions = res;
      },
    });

    // User Addresses
    this.customerService.getUserAddresssList().subscribe({
      next: (res: UserAddressDto[]) => {
        this.userAddresses = res;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Retrive failed!',
          detail: 'Faild to get your addresses.',
        });
        console.log(err);
      },
    });

    // User Payments
    this.customerService.getUserPaymentsList().subscribe({
      next: (res: UserPaymentDto[]) => {
        this.userPayments = res;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Retrive failed!',
          detail: 'Faild to get your payment methods.',
        });
        console.log(err);
      },
    });
  }

  // Steps Next Prev Complete Functions
  nextPage() {
    if (this.activeIndex === 0) {
      if (!this.utilityService.isNullOrUndefined(this.selectedAddress)) {
        this.isSelected = true;
        this.activeIndex = 1;
      } else {
        this.isSelected = false;
      }
    } else if (this.activeIndex === 1) {
      if (!this.utilityService.isNullOrUndefined(this.selectedShippingOption)) {
        this.isSelected = true;
        this.activeIndex = 2;
      } else {
        this.isSelected = false;
      }
    } else if (this.activeIndex === 2) {
      if (!this.utilityService.isNullOrUndefined(this.selectedPayment)) {
        this.activeIndex = 3;
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    }
  }

  prevPage() {
    if (this.activeIndex === 3) {
      this.activeIndex = 2;
    } else if (this.activeIndex === 2) {
      this.activeIndex = 1;
    } else if (this.activeIndex === 1) {
      this.activeIndex = 0;
    }
  }

  // Add new order.
  complete() {
    if (
      !this.utilityService.isNullOrUndefined(this.selectedAddress) &&
      !this.utilityService.isNullOrUndefined(this.selectedShippingOption) &&
      !this.utilityService.isNullOrUndefined(this.selectedPayment)
    ) {
      let orderDetails: OrderDetailsDto = {
        userAddressId: this.selectedAddress.id,
        shippingOptionId: this.selectedShippingOption.id,
        userPaymentId: this.selectedPayment.id,
        discountCode: this.discountCode,
      };

      this.customerService.addOrder(orderDetails);
    }
  }

  // Select User Address
  selectAddress(value: any) {
    this.selectedAddress = value;
  }

  // Select Shipping Option
  selectShippingOption(value: any) {
    this.selectedShippingOption = value;
    if (value != null) {
      this.total = this.subTotal + value.cost;
      this.shippingCost = value.cost;
    } else {
      this.total = this.subTotal;
      this.shippingCost = 0;
    }
  }
  // Select User Payment
  selectPayment(value: any) {
    this.selectedPayment = value;
  }

  // If new user address(the user has not any address).
  newUserAddress(val: UserAddressDto) {
    this.userAddresses.push(val);
  }

  // If new user payment.
  newUserPayment(val: UserPaymentDto) {
    this.userPayments.push(val);
  }

  // Add Discount Code API call
  addDiscountCode(val: string) {
    if (val == '') {
      this.messageService.add({
        severity: 'info',
        summary: 'No discount code is applied.',
      });
      this.discount = null;
      this.discountCode = '';
      this.resetPricesIfNoDiscount();
    } else {
      this.customerService.getDiscount(val).subscribe({
        next: (res: DiscountDto) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added successfully!',
            detail: 'You added a discount code successfully!',
          });
          this.discountCode = val;
          this.discount = res;
          this.updatePricesIfDiscount();
        },

        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'invaild discount code failed!',
            detail: 'This code is invaild or expired.',
          });
          if (this.discount != null) {
            this.discount = null;
            this.discountCode = '';
            this.resetPricesIfNoDiscount();
          }
        },
      });
    }
  }

  // If this code is available for any item => update the total.
  updatePricesIfDiscount() {
    // Check the discount
    if (this.discount != null) {
      // Make a copy
      this.tempCartItems = this.cartItems?.slice();
      // Filter the items if the product has this discount then map.
      //   ?.filter((c) =>
      //   c?.product?.discounts?.find((d) => d.id == this.discount?.id)
      // )
      this.cartItems = this.tempCartItems?.map((c) => {
        // Make a new objects if you did not this it will modify the original array
        // including tempCartItems because they have the same ref to the object(cart item and product).
        // You can also use deep copy to get the same result if the arry is has more complex objects.
        let cartItem = { ...c };
        // if the product has this discount so we can apply the discount
        if (
          cartItem?.product?.discounts?.find((d) => d.id == this.discount?.id)
        ) {
          let product = { ...cartItem.product };
          // To prevent the error
          if (product != undefined) {
            // Save old price then apply the discount
            product.priceBeforeDiscount = cartItem.product?.price;
            product.price =
              product.price! * (1 - this.discount?.discountPercent!);
          }
          cartItem.product = product;
        }
        return cartItem;
      });
      // Update total and suptotal
      this.updateTotalAndSupTotal();
    }
  }

  // Reset the cartItems var to reset the prices
  resetPricesIfNoDiscount() {
    if (this.discount == null) {
      this.cartItems = this.tempCartItems?.slice();
      this.updateTotalAndSupTotal();
    }
  }

  // Calculate subtotal and total.
  updateTotalAndSupTotal() {
    this.subTotal = 0;
    this.cartItems?.forEach((c) => {
      if (c.product?.price != undefined && this.subTotal != undefined) {
        this.subTotal += c.product?.price * c.quantity!;
      }
    });
    // If the user selected a shipping option before adding the discount.
    this.selectShippingOption(this.selectedShippingOption);
  }
}
