import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
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
        stayLoggedIn: [''],
      },
      { updateOn: 'blur' }
    );
  }

  registerUser() {
    console.log(this.loginForm.getRawValue());
  }
}
