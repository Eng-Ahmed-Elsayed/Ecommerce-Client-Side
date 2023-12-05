import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import passwordMatchValidator from '../../custom-components/validators/passwordMatchValidator';

@Component({
  selector: 'app-rest-password-v2',
  templateUrl: './rest-password-v2.component.html',
  styleUrls: ['./rest-password-v2.component.scss'],
})
export class RestPasswordV2Component implements OnInit {
  resetPasswordForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        password: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(20),
            ],
          },
        ],
        confirmPassword: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(20),
            ],
          },
        ],
        email: [
          this.activatedRoute.snapshot.queryParams['email'],
          { validators: [Validators.required, Validators.email] },
        ],
        token: [
          this.activatedRoute.snapshot.queryParams['token'],
          { validators: [Validators.required] },
        ],
      },
      { validators: passwordMatchValidator, updateOn: 'blur' }
    );
  }

  resetPassword() {
    this.authService
      .resetPassword(this.resetPasswordForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.errorMessage = '';
          this.messageService.add({
            severity: 'success',
            summary: 'The password has been updated.',
          });
          this.router.navigateByUrl('/auth/login');
        },
        error: (err: any) => {
          this.errorMessage = err;
          this.messageService.add({
            severity: 'error',
            summary: err,
          });
        },
      });
  }
}
