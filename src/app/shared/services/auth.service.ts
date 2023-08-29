import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authChangeSub = new Subject<boolean>();
  public authChange = this.authChangeSub.asObservable();
  private userEmail!: string;

  // set setUserEmail(v: string) {
  //   this.userEmail = v;
  // }
  get getUserEmail() {
    return this.userEmail;
  }

  private authApiUrl = environment.baseApiUrl + 'accounts/';

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.sendAuthStateChangeNotification();
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  registerUser(
    body: UserForRegistrationDto
  ): Observable<RegistrationResponseDto> {
    return this.httpClient.post<RegistrationResponseDto>(
      this.authApiUrl + 'registration',
      body
    );
  }

  loginUser(body: UserForAuthenticationDto): Observable<AuthResponseDto> {
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

  afterLoginSuccess(token: string, returnURL: string, email: string) {
    localStorage.setItem('token', token);
    this.userEmail = email;
    this.sendAuthStateChangeNotification();
    this.router.navigateByUrl(returnURL || '/');
  }

  forgotPassword(body: ForgotPasswordDto): Observable<any> {
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
    return this.httpClient.post<any>(
      this.authApiUrl + 'send-email-confirmation',
      body
    );
  }

  sendAuthStateChangeNotification() {
    this.authChangeSub.next(this.isUserAuthenticated());
  }

  logoutUser(): Observable<any> {
    const body: LogoutDto = { email: this.userEmail };
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification();
    return this.httpClient.post<any>(this.authApiUrl + 'logout', body);
  }

  getUserRole() {
    const token = localStorage.getItem('token') as string;
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    return role;
  }

  public externalLogin = (
    body: ExternalAuthDto
  ): Observable<AuthResponseDto> => {
    return this.httpClient.post<AuthResponseDto>(
      this.authApiUrl + 'external-login',
      body
    );
  };
}
