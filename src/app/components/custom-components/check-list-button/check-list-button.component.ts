import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckListItemDto } from 'src/app/shared/models/customer/checkListItemDto';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-check-list-button',
  templateUrl: './check-list-button.component.html',
  styleUrls: ['./check-list-button.component.scss'],
})
export class CheckListButtonComponent {
  @Input() product!: ProductDto;
  @Input() styleClass: string = 'p-button-success p-button-rounded mr-2';

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  addItemToCheckList = () => {
    let checkListItem: CheckListItemDto = {
      productId: this.product.id,
    };
    this.confirmationService.confirm({
      message: 'Do you want to add this item to your checkList.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.addCheckListItem(checkListItem).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Added to your checkList successfully!',
              detail:
                'You have just added a new product to your checkList successfully.',
            });
            this.product.isInCheckList = true;
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add product to your checkList failed!',
              detail: 'Faild to add a new product to your checkList.',
            });
            console.log(err);
          },
        });
      },
    });
  };

  deleteItemToCheckList = () => {
    this.confirmationService.confirm({
      message: 'Do you want to delete this item from your checkList.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.deleteCheckListItem(this.product.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted from your checkList successfully!',
              detail:
                'You have just deleted a product from your checkList successfully.',
            });
            this.product.isInCheckList = false;
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete product from your checkList failed!',
              detail: 'Faild to delete a product to your checkList.',
            });
            console.log(err);
          },
        });
      },
    });
  };
}
