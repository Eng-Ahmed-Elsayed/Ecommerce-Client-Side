import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ShoppingCartDto } from 'src/app/shared/models/customer/shoppingCartDto';
import { UserAddressDto } from 'src/app/shared/models/customer/userAddressDto';
import { UserPaymentDto } from 'src/app/shared/models/customer/userPaymentDto';
import { environment } from 'src/environments/environment';
import { ShippingOptionDto } from '../models/shared/shippingOptionDto';
import { CartItemDto } from '../models/customer/cartItemDto';
import { OrderDetailsDto } from '../models/customer/orderDetails';
import { Router } from '@angular/router';
import { CheckListDto } from '../models/customer/checkListDto';
import { CheckListItemDto } from '../models/customer/checkListItemDto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUserApiUrl: string = environment.baseApiUrl + 'users/';
  private paymentUrl: string = this.baseUserApiUrl + 'payments/';
  private addressUrl: string = this.baseUserApiUrl + 'addresses/';
  private cartUrl: string = this.baseUserApiUrl + 'carts/';
  private ordersUrl: string = this.baseUserApiUrl + 'orders/';
  private checkListUrl: string = this.baseUserApiUrl + 'checkList/';
  private shippingOptUrl: string = environment.baseApiUrl + 'shipping-options/';

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  // User Payment APIs.
  getUserPayment(id: string): Observable<UserPaymentDto> {
    return this.httpClient.get<UserPaymentDto>(this.paymentUrl + id);
  }

  getUserPaymentsList(): Observable<UserPaymentDto[]> {
    return this.httpClient.get<UserPaymentDto[]>(this.paymentUrl);
  }

  addUserPayment(body: UserPaymentDto) {
    return this.httpClient.post(this.paymentUrl, body);
  }

  updateUserPayment(body: UserPaymentDto) {
    return this.httpClient.put(this.paymentUrl + body.id, body);
  }

  deleteUserPayment(id: string) {
    return this.httpClient.delete(this.paymentUrl + id);
  }

  // User Address APIs.

  getUserAddress(id: string): Observable<UserAddressDto> {
    return this.httpClient.get<UserAddressDto>(this.addressUrl + id);
  }

  getUserAddresssList(): Observable<UserAddressDto[]> {
    return this.httpClient.get<UserAddressDto[]>(this.addressUrl);
  }

  addUserAddress(body: UserAddressDto) {
    return this.httpClient.post(this.addressUrl, body);
  }

  updateUserAddress(body: UserAddressDto) {
    return this.httpClient.put(this.addressUrl + body.id, body);
  }

  deleteUserAddress(id: string) {
    return this.httpClient.delete(this.addressUrl + id);
  }

  // Cart APIs.
  cartReview(): Observable<ShoppingCartDto> {
    return this.httpClient.get<ShoppingCartDto>(this.cartUrl);
  }

  addCartItem(body: CartItemDto) {
    this.confirmationService.confirm({
      message: 'Do you want to add this item to your cart.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpClient.post<CartItemDto>(this.cartUrl, body).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Added to your cart successfully!',
              detail:
                'You have just added a new product to your cart successfully.',
            });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add product to your cart failed!',
              detail: 'Faild to add new product to your cart.',
            });
            console.log(err);
          },
        });
      },
    });
  }

  updateCartItem(body: CartItemDto) {
    return this.httpClient.patch(this.cartUrl, body);
  }

  updateShoppingCart(body: ShoppingCartDto) {
    return this.httpClient.put(this.cartUrl, body);
  }

  deleteCartItem(id: string) {
    return this.httpClient.delete(this.cartUrl + id);
  }

  // Shipping option APIs.
  getShippingOptionList(): Observable<ShippingOptionDto[]> {
    return this.httpClient.get<ShippingOptionDto[]>(this.shippingOptUrl);
  }

  // Orders APIs.
  addOrder(body: OrderDetailsDto) {
    console.log(body);
    return this.confirmationService.confirm({
      message: 'Do you want to make this order.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpClient.post(this.ordersUrl, body).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Order has been created successfully!',
              detail: 'You have just added an new order.',
            });
            // Navigate to the orders history
            this.router.navigateByUrl('/dashboard/user/orders-history');
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Can not add your order.',
              detail: 'Faild to add new order, please try again later.',
            });
            console.log(err);
          },
        });
      },
    });
  }

  getOrders(): Observable<OrderDetailsDto[]> {
    return this.httpClient.get<OrderDetailsDto[]>(this.ordersUrl);
  }

  // Favorites APIs.
  checkListReview(): Observable<CheckListItemDto[]> {
    return this.httpClient.get<CheckListItemDto[]>(this.checkListUrl);
  }

  addCheckListItem(body: CheckListItemDto) {
    return this.httpClient.post<CheckListItemDto>(this.checkListUrl, body);
  }

  deleteCheckListItem(id: string | undefined) {
    return this.httpClient.delete(this.checkListUrl + id);
  }
}
