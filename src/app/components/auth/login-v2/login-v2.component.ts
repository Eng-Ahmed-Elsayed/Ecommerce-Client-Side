import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { ExternalAuthDto } from '../models/externalAuthDto';
import { CredentialResponse } from 'google-one-tap';
import { AuthResponseDto } from '../models/authResponseDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-v2',
  templateUrl: './login-v2.component.html',
})
export class LoginV2Component implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  errorMessage: string = '';
  returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'];
  private clientId = environment.googleClientId;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _ngZone: NgZone,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        userName: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ],
          },
        ],
        password: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20),
            ],
          },
        ],
        stayLoggedIn: [''],
      },
      { updateOn: 'blur' }
    );

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    const body: ExternalAuthDto = {
      idToken: response.credential,
      provider: 'GOOGLE',
    };
    this.authService.externalLogin(body).subscribe({
      next: (res: AuthResponseDto) => {
        this._ngZone.run(() => {
          this.authService.afterLoginSuccess(
            res.token,
            this.returnUrl,
            // res.email,
            true
          );
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  loginUser() {
    let { stayLoggedIn: _, ...body } = this.loginForm.getRawValue();
    this.authService.loginUser(body).subscribe({
      next: (res: AuthResponseDto) => {
        if (res.is2StepVerificationRequired) {
          this.router.navigate(['/two-step-verification'], {
            queryParams: {
              returnUrl: this.returnUrl,
              provider: res.provider,
              email: this.loginForm.get('email')?.value,
            },
          });
        } else {
          this.authService.afterLoginSuccess(
            res.token,
            this.returnUrl,
            // res.email,
            this.loginForm.get('stayLoggedIn')?.value
          );
        }
      },
      error: (res: any) => {
        this.errorMessage = res;
      },
    });
  }
}
