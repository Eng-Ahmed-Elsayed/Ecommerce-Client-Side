import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CartItemDto } from 'src/app/shared/models/cartItemDto';
import { ShoppingCartDto } from 'src/app/shared/models/shoppingCartDto';
import { UserAddressDto } from 'src/app/shared/models/userAddressDto';
import { UserPaymentDto } from 'src/app/shared/models/userPaymentDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUserApiUrl: string = environment.baseApiUrl + 'user/';
  private paymentUrl: string = this.baseUserApiUrl + 'payment/';
  private addressUrl: string = this.baseUserApiUrl + 'address/';
  private cartUrl: string = this.baseUserApiUrl + 'cart/';

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // User Payment API
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

  // User Address API

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

  // Cart API
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
              summary: 'Add produt to your cart failed!',
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
}
