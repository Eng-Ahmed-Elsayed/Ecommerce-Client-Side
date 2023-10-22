import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CustomerService } from '../../../../shared/services/customer.service';
import { UserPaymentDto } from 'src/app/shared/models/userPaymentDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
})
export class UserPaymentComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  userPayments!: UserPaymentDto[];
  userPayment!: UserPaymentDto;
  current: string = 'list';

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getPaymentList();
    this.items = [
      {
        label: 'Your Payment Methods',
        icon: 'pi pi-fw pi-list',
        command: () => {
          this.current != 'list' ? this.getPaymentList() : '';
          this.current = 'list';
        },
      },
      {
        label: 'Add New Payment',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.current = 'add';
        },
      },
    ];

    this.activeItem = this.items[0];
  }

  inputFilter(event: Event) {
    return (event.target as HTMLTextAreaElement)?.value;
  }

  getPaymentList() {
    this.customerService.getUserPaymentsList().subscribe({
      next: (res: UserPaymentDto[]) => {
        this.userPayments = res;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Retrive failed!',
          detail: 'Faild to get your payment methods.',
        });
        console.log(err);
      },
    });
  }

  deleteUserPayment(userPayment: UserPaymentDto) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete: ${userPayment.name}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (userPayment.id !== undefined) {
          this.customerService.deleteUserPayment(userPayment.id).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Delete Payment successfully!',
                detail: `Selected Payment (${userPayment.name}) has been removed successfully!`,
              });
              this.userPayments = this.userPayments.filter(
                (val) => val.id !== userPayment.id
              );
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Failed to delete your payment.',
                detail: err.message,
              });
              console.log(err);
            },
          });
        }
      },
    });
  }

  getUserPaymentForUpdate(id: string) {
    this.customerService.getUserPayment(id).subscribe({
      next: (res: UserPaymentDto) => {
        this.current = 'edit';
        this.userPayment = res;
        this.activeItem = this.items![2];
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
