import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-send-email-confirmation',
  templateUrl: './send-email-confirmation.component.html',
  styleUrls: ['./send-email-confirmation.component.scss'],
})
export class SendEmailConfirmationComponent implements OnInit {
  sendEmailConfirmationForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}
  ngOnInit(): void {
    this.sendEmailConfirmationForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  sendEmailConfirmation() {
    this.authService
      .SendEmailConfirmation(this.sendEmailConfirmationForm.getRawValue())
      .subscribe({
        next: (res) =>
          (this.successMessage =
            'The link has been sent, please check your email to confirm your account email.'),
        error: (err: HttpErrorResponse) => (this.errorMessage = err.message),
      });
  }
}
