import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password-v2',
  templateUrl: './forgot-password-v2.component.html',
  styleUrls: ['./forgot-password-v2.component.scss'],
})
export class ForgotPasswordV2Component implements OnInit {
  forgotPasswordForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  forgotPassword() {
    this.forgotPasswordForm.markAsPristine();
    this.authService
      .forgotPassword(this.forgotPasswordForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.errorMessage = '';
          this.successMessage =
            'The link has been sent, please check your email to reset your password.';
          this.messageService.add({
            severity: 'success',
            summary: 'The link has been sent successfully.',
            detail:
              'The link has been sent, please check your email to reset your password.',
          });
        },
        error: (err: any) => {
          this.successMessage = '';
          this.errorMessage = err;
          this.messageService.add({
            severity: 'error',
            summary: err,
          });
        },
      });
  }
}
