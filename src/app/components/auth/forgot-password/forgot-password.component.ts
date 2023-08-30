import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  forgotPassword() {
    this.authService
      .forgotPassword(this.forgotPasswordForm.getRawValue())
      .subscribe({
        next: (res) =>
          (this.successMessage =
            'The link has been sent, please check your email to reset your password.'),
        error: (err: HttpErrorResponse) => (this.errorMessage = err.message),
      });
  }
}
