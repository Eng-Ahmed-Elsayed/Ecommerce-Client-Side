import { Component, OnInit } from '@angular/core';
import { UpsertFeatureProductsDto } from 'src/app/shared/models/shared/upsertFeatureProductsDto';
import { AdminService } from '../../services/admin.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-upsert-feature-products',
  templateUrl: './upsert-feature-products.component.html',
  styleUrls: ['./upsert-feature-products.component.scss'],
})
export class UpsertFeatureProductsComponent implements OnInit {
  upsertFeatureProductsDto: UpsertFeatureProductsDto | null = null;

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Get UpsertFeatureProductsDto
    this.adminService.getFeatureProductsAndOther().subscribe({
      next: (res: UpsertFeatureProductsDto) => {
        this.upsertFeatureProductsDto = res;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  upsertFeatureProducts() {
    this.confirmationService.confirm({
      message: `Are you sure that you want to update feature products`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService
          .upsertFeatureProducts(this.upsertFeatureProductsDto!)
          .subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Update products successfully!',
                detail: `Selected products have been updated successfully!`,
              });
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Update products failed!',
              });
              console.log(err);
            },
          });
      },
    });
  }
}
