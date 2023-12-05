import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-email-confirmation-v2',
  templateUrl: './email-confirmation-v2.component.html',
  styleUrls: ['./email-confirmation-v2.component.scss'],
})
export class EmailConfirmationV2Component implements OnInit {
  emailConfirmationForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.emailConfirmationForm = this.fb.group({
      email: [
        this.activatedRoute.snapshot.queryParams['email'],
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      token: [
        this.activatedRoute.snapshot.queryParams['token'],
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  emailConfirmation() {
    this.authService
      .emailConfirmation(this.emailConfirmationForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Email confirmation has been completed.',
            detail: 'Your have completed email confirmation successfully.',
          });
          this.errorMessage = '';
          this.successMessage = 'Email confirmation has been completed.';
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
