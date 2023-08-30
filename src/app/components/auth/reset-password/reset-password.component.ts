import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [''],
      confirmPassword: [''],
      email: [this.activatedRoute.snapshot.queryParams['email']],
      token: [this.activatedRoute.snapshot.queryParams['token']],
    });
  }

  resetPassword() {
    this.authService
      .resetPassword(this.resetPasswordForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.successMessage = 'The password has been updated. ';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.successMessage = '';
        },
      });
  }
}
