import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.scss'],
})
export class TwoStepVerificationComponent implements OnInit {
  twoStepLoginForm!: FormGroup;
  errorMessage!: string;
  returnURL: string = this.activatedRoute.snapshot.queryParams['returnURL'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.twoStepLoginForm = this.fb.group({
      email: [
        this.activatedRoute.snapshot.queryParams['email'],
        { hidden: true },
      ],
      provider: [
        this.activatedRoute.snapshot.queryParams['provider'],
        { hidden: true },
      ],
      token: ['', { validators: [Validators.required] }],
    });
  }

  twoStepLoginUser() {
    this.authService
      .twoStepLogin(this.twoStepLoginForm.getRawValue())
      .subscribe({
        next: (res) =>
          this.authService.afterLoginSuccess(
            res.token,
            this.returnURL
            // res.email
          ),
        error: (err: HttpErrorResponse) => (this.errorMessage = err.message),
      });
  }
}
