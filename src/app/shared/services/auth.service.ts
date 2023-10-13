import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { AuthResponseDto } from 'src/app/components/auth/models/authResponseDto';
import { EmailConfirmationDto } from 'src/app/components/auth/models/emailConfirmationDto';
import { ExternalAuthDto } from 'src/app/components/auth/models/externalAuthDto';
import { ForgotPasswordDto } from 'src/app/components/auth/models/forgotPasswordDto';
import { LogoutDto } from 'src/app/components/auth/models/logoutDto';
import { RegistrationResponseDto } from 'src/app/components/auth/models/registrationResponseDto';
import { ResetPasswordDto } from 'src/app/components/auth/models/resetPasswordDto';
import { SendEmailConfirmationDto } from 'src/app/components/auth/models/sendEmailConfirmationDto';
import { TwoFactorDto } from 'src/app/components/auth/models/twoFactorDto ';
import { UserForAuthenticationDto } from 'src/app/components/auth/models/userForAuthenticationDto ';
import { UserForRegistrationDto } from 'src/app/components/auth/models/userForRegistrationDto ';
import { environment } from 'src/environments/environment';
import { createImgPath, uploadFiles } from './photo.service';
import { UserDto } from 'src/app/components/auth/models/userDto';
import { UserChangePasswordDto } from 'src/app/components/auth/models/userChangePasswordDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authChangeSub = new BehaviorSubject<boolean>(
    this.isUserAuthenticated()
  );
  public authChange = this.authChangeSub.asObservable();

  private authApiUrl = environment.baseApiUrl + 'auth/';
  private authClientUrl = environment.clientURI + 'auth/';

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.sendAuthStateChangeNotification();
  }

  isUserAuthenticated(): boolean {
    let token = tokenGetter();
    let val = token !== null && !this.jwtHelper.isTokenExpired(token);
    // this.isAuthenticated$?.next(val);
    return val;
  }

  registerUser(
    body: UserForRegistrationDto
  ): Observable<RegistrationResponseDto> {
    body.clientURI = this.authClientUrl + 'email-confirmation';
    return this.httpClient.post<RegistrationResponseDto>(
      this.authApiUrl + 'registration',
      body
    );
  }

  loginUser(body: UserForAuthenticationDto): Observable<AuthResponseDto> {
    body.clientURI = this.authClientUrl + 'forgot-password';
    return this.httpClient.post<AuthResponseDto>(
      this.authApiUrl + 'login',
      body
    );
  }

  twoStepLogin(body: TwoFactorDto): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(
      this.authApiUrl + 'two-step-verification',
      body
    );
  }

  afterLoginSuccess(
    token: string,
    returnURL: string,
    // email: string,
    stayLoggedIn: boolean = false
  ) {
    stayLoggedIn
      ? localStorage.setItem('token', token)
      : sessionStorage.setItem('token', token);
    // this.userEmail = email;
    this.sendAuthStateChangeNotification();
    this.router.navigateByUrl(returnURL || '/');
  }

  forgotPassword(body: ForgotPasswordDto): Observable<any> {
    body.clientURI = this.authClientUrl + 'reset-password';
    return this.httpClient.post<any>(this.authApiUrl + 'forgot-password', body);
  }

  resetPassword(body: ResetPasswordDto): Observable<any> {
    return this.httpClient.post<any>(this.authApiUrl + 'reset-password', body);
  }

  emailConfirmation(body: EmailConfirmationDto): Observable<any> {
    return this.httpClient.post<any>(
      this.authApiUrl + 'email-confirmation',
      body
    );
  }

  SendEmailConfirmation(body: SendEmailConfirmationDto): Observable<any> {
    body.clientURI = this.authClientUrl + 'email-confirmation';
    return this.httpClient.post<any>(
      this.authApiUrl + 'send-email-confirmation',
      body
    );
  }

  sendAuthStateChangeNotification() {
    this.authChangeSub.next(this.isUserAuthenticated());
  }

  logoutUser(): Observable<any> {
    const body: LogoutDto = { email: this.getUserEmail() };
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.sendAuthStateChangeNotification();
    return this.httpClient.post<any>(this.authApiUrl + 'logout', body);
  }

  private decodedToken() {
    return this.jwtHelper.decodeToken(tokenGetter() as string);
  }

  getUserRole() {
    return this.decodedToken()[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }

  getUsername() {
    return this.decodedToken()[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];
  }

  getUserEmail() {
    return this.decodedToken()[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ];
  }

  getUserImgPath() {
    return this.decodedToken()['imgPath'] !== ''
      ? createImgPath(this.decodedToken()['imgPath'])
      : '';
  }

  public externalLogin = (
    body: ExternalAuthDto
  ): Observable<AuthResponseDto> => {
    return this.httpClient.post<AuthResponseDto>(
      this.authApiUrl + 'external-login',
      body
    );
  };

  getUser() {
    return this.httpClient.get<any>(this.authApiUrl);
  }

  updateUser(body: UserDto) {
    return this.httpClient.patch(this.authApiUrl, body);
  }

  userChangePassword(body: UserChangePasswordDto) {
    return this.httpClient.put(this.authApiUrl, body);
  }

  uploadUserImage(files: any, multi: boolean = false) {
    let { url, formData } = uploadFiles(files, multi, this.authApiUrl);
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}

export function tokenGetter() {
  let token = sessionStorage.getItem('token');
  if (token === null) {
    token = localStorage.getItem('token');
  }
  return token;
}
