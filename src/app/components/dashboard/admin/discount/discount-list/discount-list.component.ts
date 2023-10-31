import { Component, OnInit } from '@angular/core';
import { DiscountDto } from 'src/app/shared/models/shared/discountDto';
import { AdminService } from '../../services/admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { createImgPath } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
})
export class DiscountListComponent implements OnInit {
  discounts!: DiscountDto[];
  discount!: DiscountDto;
  selectedDiscounts!: DiscountDto[];

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.adminService.getDiscountList().subscribe({
      next: (res) => {
        this.discounts = res;
      },
      error: (err) => console.log(err),
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  inputFilter(event: Event) {
    return (event.target as HTMLTextAreaElement)?.value;
  }

  openNew() {
    // this.discount = {};
    // this.submitted = false;
    // this.discountDialog = true;
  }

  editDiscount(discount: DiscountDto) {
    // this.discount = { ...discount };
    // this.discountDialog = true;
  }

  deleteDiscount(discount: DiscountDto) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete: ${discount.name}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (discount.id !== undefined) {
          this.adminService.deleteDiscount(discount.id).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Delete discount successfully!',
                detail: `Selected discount (${discount.name}) has been removed successfully!`,
              });
              this.discounts = this.discounts.filter(
                (val) => val.id !== discount.id
              );
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Delete discount failed!',
                detail: err.message,
              });
              console.log(err);
            },
          });
        }
      },
    });
  }

  deleteSelectedDiscounts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected discounts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService
          .deleteDiscountRange(this.selectedDiscounts)
          .subscribe({
            next: (res) => {
              this.discounts = this.discounts.filter(
                (val) => !this.selectedDiscounts?.includes(val)
              );
              this.selectedDiscounts = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Discounts Deleted',
                detail: 'Selected discounts have been removed successfully!',
                life: 3000,
              });
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Delete discount range failed!',
                detail: err.message,
              });
              console.log(err);
            },
          });
      },
    });
  }
}
