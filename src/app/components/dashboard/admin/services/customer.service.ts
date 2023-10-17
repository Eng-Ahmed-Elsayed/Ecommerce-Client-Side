import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private httpClient: HttpClient) {}

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
}
