import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../../shared/services/customer.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPaymentDto } from 'src/app/shared/models/customer/userPaymentDto';

@Component({
  selector: 'app-user-payment-form',
  templateUrl: './user-payment-form.component.html',
  styleUrls: ['./user-payment-form.component.scss'],
})
export class UserPaymentFormComponent implements OnInit {
  @Input() checkOut: boolean = false;
  // paymentInformation: any;
  userPaymentForm!: FormGroup;
  @Input() userPayment!: UserPaymentDto;
  @Input() isUpdate: boolean = false;
  @Output() newUserPaymentEvent = new EventEmitter<UserPaymentDto>();

  // constructor(private router: Router) {}

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // If add add new
    this.userPaymentForm = this.fb.group({
      name: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        },
      ],
      accountNo: [
        ,
        {
          validators: [
            Validators.required,
            Validators.pattern('^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$'),
          ],
        },
      ],
      expiry: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2}|[0-9]{4})$'),
          ],
        },
      ],
      cvv: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
          ],
        },
      ],
      remember: [''],
      provider: [
        'Test: ' + (Math.random() + 1).toString(36).substring(7),
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        },
      ],
    });

    // Update
    if (this.isUpdate) {
      this.userPaymentForm.reset({
        name: this.userPayment.name,
        accountNo: this.userPayment.accountNo,
        expiry: this.userPayment.expiry,
        cvv: this.userPayment.cvv,
        remember: this.userPayment.remember,
        provider: this.userPayment.provider,
      });
      this.userPaymentForm.addControl(
        'id',
        new FormControl(this.userPayment.id)
      );
    }
  }

  upsertPayment() {
    // If add add new
    if (!this.isUpdate) {
      this.customerService
        .addUserPayment(this.userPaymentForm.getRawValue())
        .subscribe({
          next: (res: UserPaymentDto) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Added new payment successfully!',
              detail: 'You have just added a new payment method successfully.',
            });
            this.newUserPaymentEvent.emit(res);
            this.userPaymentForm.reset({
              provider: [
                'Test: ' + (Math.random() + 1).toString(36).substring(7),
              ],
            });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add payment failed!',
              detail: 'Faild to add new payment method.',
            });
            console.log(err);
          },
        });
    } else {
      this.customerService
        .updateUserPayment(this.userPaymentForm.getRawValue())
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Update payment successfully!',
              detail: 'You have just updated your payment method successfully.',
            });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update payment failed!',
              detail: 'Faild to update your payment method.',
            });
            console.log(err);
          },
        });
    }
  }

  //   nextPage() {
  //       this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
  //       this.router.navigate(['steps/confirmation']);
  //   }

  //  prevPage() {
  //       this.router.navigate(['steps/seat']);
  //   }
}
