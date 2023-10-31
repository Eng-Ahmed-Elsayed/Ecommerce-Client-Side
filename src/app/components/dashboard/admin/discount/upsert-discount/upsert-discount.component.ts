import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DiscountDto } from 'src/app/shared/models/shared/discountDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { createImgPath } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-upsert-discount',
  templateUrl: './upsert-discount.component.html',
  styleUrls: ['./upsert-discount.component.scss'],
})
export class UpsertDiscountComponent implements OnInit {
  upsertDiscountForm!: FormGroup;
  response: any = { dbPath: '' };
  uploadedFiles: any[] = [];
  urlPath: string = this.activatedRoute.snapshot.url[1].path;
  // If update
  sourceProducts?: ProductDto[];
  targetProducts?: ProductDto[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  ngOnInit(): void {
    // Add discount form
    if (this.urlPath === 'add') {
      this.upsertDiscountForm = this.fb.group({
        name: [''],
        discountPercent: [''],
        isActive: [false],
        products: [''],
      });
    }
    // Update discount form
    else {
      this.activatedRoute.data.subscribe({
        next: (data: any) => {
          let discount: DiscountDto = data.discount;
          this.upsertDiscountForm = this.fb.group({
            id: [discount.id],
            name: [discount.name],
            discountPercent: [discount.discountPercent],
            isActive: [discount.isActive],
            // products: [discount.products],
          });
          // Update source and target products so we will be able
          // to add products to this discount and also remove it.
          this.sourceProducts = discount.otherProducts;
          this.targetProducts = discount.products;
        },
      });
    }
  }

  upsertDiscount() {
    // Add discount
    if (this.urlPath === 'add') {
      this.adminService
        .addDiscount(this.upsertDiscountForm.getRawValue())
        .subscribe({
          next: (res: DiscountDto) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Add new discount successfully!',
              detail: `Add new discount: ${res.name}`,
            });
            this.upsertDiscountForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add discount failed!',
              detail: err.message,
            });
            console.log(err);
          },
        });
    }
    // Update discount
    else {
      let discountBody: DiscountDto = this.upsertDiscountForm.getRawValue();
      // discountBody.newProducts = this.targetProducts;
      // We will use other products to set the new products
      discountBody.otherProducts = this.targetProducts;
      console.log(discountBody);
      this.adminService.updateDiscount(discountBody).subscribe({
        next: (res: DiscountDto) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update discount successfully!',
            detail: `Update discount: ${res.name}`,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update discount failed!',
            detail: err.message,
          });
          console.log(err);
        },
      });
    }
  }
}
