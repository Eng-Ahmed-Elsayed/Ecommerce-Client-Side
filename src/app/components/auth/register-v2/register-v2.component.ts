import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import passwordMatchValidator from '../../custom-components/validators/passwordMatchValidator';
import { RegistrationResponseDto } from '../models/registrationResponseDto';

@Component({
  selector: 'app-register-v2',
  templateUrl: './register-v2.component.html',
  styleUrls: ['./register-v2.component.scss'],
})
export class RegisterV2Component implements OnInit {
  errorMessage: string = '';
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', { validators: [Validators.email, Validators.required] }],
        userName: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ],
          },
        ],
        password: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20),
            ],
          },
        ],
        confirmPassword: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20),
            ],
          },
        ],
        termsAndConditons: [false],
      },
      { validators: passwordMatchValidator, updateOn: 'blur' }
    );
  }

  registerUser() {
    this.authService.registerUser(this.registerForm.getRawValue()).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'The registration has been completed successfully.',
          detail:
            'The confirmation link has been sent to your email, please check your email to confirm your account.',
        });
      },
      error: (err: any) => {
        this.errorMessage = '';
        let values: string[] = Object.values(err);
        values.forEach((m: string) => {
          this.errorMessage += m + '\n';
        });
        this.messageService.add({
          severity: 'error',
          summary: this.errorMessage,
        });
      },
      complete: () => {
        this.router.navigateByUrl('/auth/login');
      },
    });
  }
}
