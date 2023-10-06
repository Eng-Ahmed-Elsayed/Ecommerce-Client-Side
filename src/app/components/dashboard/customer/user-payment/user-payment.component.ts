import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
})
export class UserPaymentComponent implements OnInit {
  paymentInformation: any;
  userPaymentForm!: FormGroup;

  // constructor(private router: Router) {}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userPaymentForm = this.fb.group({
      name: [''],
      number: [],
      date: [''],
      cvv: [''],
      remember: [''],
    });
  }

  //   nextPage() {
  //       this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
  //       this.router.navigate(['steps/confirmation']);
  //   }

  //  prevPage() {
  //       this.router.navigate(['steps/seat']);
  //   }
}
