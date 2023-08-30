import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  emailConfirmationForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.emailConfirmationForm = this.fb.group({
      email: [this.activatedRoute.snapshot.queryParams['email']],
      token: [this.activatedRoute.snapshot.queryParams['token']],
    });
  }

  emailConfirmation() {
    this.authService
      .emailConfirmation(this.emailConfirmationForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.errorMessage = '';
          this.successMessage = 'Email confirmationForm has been completed.';
        },
        error: (err: HttpErrorResponse) => {
          this.successMessage = '';
          this.errorMessage = err.message;
        },
      });
  }
}
