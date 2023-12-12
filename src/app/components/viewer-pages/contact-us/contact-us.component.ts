import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group(
      {
        name: [
          ,
          {
            validators: [Validators.minLength(3), Validators.maxLength(15)],
          },
        ],
        phoneNumber: [
          ,
          {
            validators: [Validators.minLength(4), Validators.maxLength(25)],
          },
        ],
        email: ['', { validators: [Validators.email, Validators.required] }],
        comment: [
          '',
          {
            validators: [
              Validators.minLength(4),
              Validators.maxLength(200),
              Validators.required,
            ],
          },
        ],
      },
      { updateOn: 'blur' }
    );
  }

  contactUs() {
    console.log(this.contactForm.getRawValue());
  }
}
