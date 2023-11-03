import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UserAddressDto } from 'src/app/shared/models/customer/userAddressDto';
import { CustomerService } from '../../../../shared/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  userAddresses!: UserAddressDto[];
  userAddress!: UserAddressDto;
  current: string = 'list';

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.getAddressList();
    this.items = [
      {
        label: 'Your Address',
        icon: 'pi pi-fw pi-list',
        command: () => {
          this.current != 'list' ? this.getAddressList() : '';
          this.current = 'list';
        },
      },
      {
        label: 'Add New Address',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.current = 'add';
        },
      },
    ];

    this.activeItem = this.items[0];
  }

  inputFilter = (event: Event) => this.utilityService.inputFilter(event);

  getAddressList() {
    this.customerService.getUserAddresssList().subscribe({
      next: (res: UserAddressDto[]) => {
        this.userAddresses = res;
        console.log(this.userAddresses.length);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Retrive failed!',
          detail: 'Faild to get your addresses.',
        });
        console.log(err);
      },
    });
  }

  deleteUserAddress(userAddress: UserAddressDto) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this address`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (userAddress.id !== undefined) {
          this.customerService.deleteUserAddress(userAddress.id).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Delete Address successfully!',
                detail: `Selected Address has been removed successfully!`,
              });
              this.userAddresses = this.userAddresses.filter(
                (val) => val.id !== userAddress.id
              );
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Failed to delete your address',
                detail: err.message,
              });
              console.log(err);
            },
          });
        }
      },
    });
  }

  getUserAddressForUpdate(id: string) {
    this.customerService.getUserAddress(id).subscribe({
      next: (res: UserAddressDto) => {
        this.current = 'edit';
        this.userAddress = res;
        this.activeItem = this.items![2];
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
