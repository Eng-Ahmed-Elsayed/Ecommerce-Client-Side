import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-send-email-confirmation-v2',
  templateUrl: './send-email-confirmation-v2.component.html',
  styleUrls: ['./send-email-confirmation-v2.component.scss'],
})
export class SendEmailConfirmationV2Component implements OnInit {
  sendEmailConfirmationForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.sendEmailConfirmationForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  sendEmailConfirmation() {
    this.authService
      .SendEmailConfirmation(this.sendEmailConfirmationForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.errorMessage = '';
          this.successMessage =
            'The link has been sent, please check your email to confirm your account email.';
          this.messageService.add({
            severity: 'success',
            summary: 'The link has been sent successfully.',
            detail:
              'The link has been sent, please check your email to confirm your account email.',
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
