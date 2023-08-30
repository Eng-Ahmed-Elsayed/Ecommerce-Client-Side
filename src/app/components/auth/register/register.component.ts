import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegistrationResponseDto } from '../models/registrationResponseDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errorMessage!: string;
  registerForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
        birthday: ['', { validators: [Validators.required] }],
      },
      { updateOn: 'blur' }
    );
  }

  registerUser() {
    this.authService.registerUser(this.registerForm.getRawValue()).subscribe({
      next: (val) => console.log(`Successful registration \n ${val}`),
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this.errorMessage = err.error.errors;
      },
      complete: () => {
        this.router.navigateByUrl('auth/login');
      },
    });
  }
}
