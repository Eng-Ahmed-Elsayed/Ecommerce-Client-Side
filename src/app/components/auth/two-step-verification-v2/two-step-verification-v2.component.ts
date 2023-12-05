import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-two-step-verification-v2',
  templateUrl: './two-step-verification-v2.component.html',
  styleUrls: ['./two-step-verification-v2.component.scss'],
})
export class TwoStepVerificationV2Component implements OnInit {
  twoStepLoginForm!: FormGroup;
  errorMessage: string = '';
  returnURL: string = this.activatedRoute.snapshot.queryParams['returnURL'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.twoStepLoginForm = this.fb.group({
      email: [
        this.activatedRoute.snapshot.queryParams['email'],
        { validators: [Validators.required], hidden: true },
      ],
      provider: [
        this.activatedRoute.snapshot.queryParams['provider'],
        { validators: [Validators.required], hidden: true },
      ],
      token: ['', { validators: [Validators.required] }],
    });
  }

  twoStepLoginUser() {
    this.authService
      .twoStepLogin(this.twoStepLoginForm.getRawValue())
      .subscribe({
        next: (res) =>
          this.authService.afterLoginSuccess(res.token, this.returnURL),
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
