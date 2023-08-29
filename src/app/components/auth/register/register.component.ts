import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.registerForm.getRawValue());
  }
}
