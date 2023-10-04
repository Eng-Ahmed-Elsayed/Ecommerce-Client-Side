import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { ProductDto } from 'src/app/shared/models/productDto';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-upsert-product',
  templateUrl: './upsert-product.component.html',
  styleUrls: ['./upsert-product.component.scss'],
})
export class UpsertProductComponent implements OnInit {
  upsertProductForm!: FormGroup;
  uploadedFiles: any[] = [];
  statusOptions!: any[];
  urlPath: string = this.activatedRoute.snapshot.url[1].path;
  // From the api
  caregoryOptions!: CategoryDto[];
  colorStateOptions!: any[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get status options(because it will just be draft or publish we will not do API cal here)
    this.statusOptions = [
      { status: 'Draft', value: 'draft' },
      { status: 'Publish', value: 'publish' },
    ];

    this.colorStateOptions = this.productService.getColors();

    // Add product form
    if (this.urlPath === 'add') {
      // Get all categories
      this.activatedRoute.data.subscribe({
        next: (data: any) => {
          this.caregoryOptions = data.categoryList;
        },
      });
      this.upsertProductForm = this.fb.group({
        name: [''],
        description: [''],
        productCode: [''],
        productSKU: [''],
        price: [],
        status: ['draft'],
        inStock: [false],
        colors: [''],
        productImages: [''],
        tags: new FormControl<string[] | null>(null),
        sizes: [],
        quantity: [1],
        categoryId: [''],
        // inventoryId: [''],
        // discountId: [''],
      });
    }
    // Update product form
    else {
      this.activatedRoute.data.subscribe({
        next: (data: any) => {
          // Get categories
          this.caregoryOptions = data.categoryList;
          // Get product
          let product: ProductDto = data.product;
          this.upsertProductForm = this.fb.group({
            id: [product.id],
            name: [product.name],
            description: [product.description],
            productCode: [product.productCode],
            productSKU: [product.productSKU],
            price: [product.price],
            status: [product.status],
            inStock: [product.inStock],
            colors: [product.colors?.map((x) => x.name)],
            productImages: [],
            // productImages: [product.productImages],
            tags: [product.tags?.map((x) => x.name)],
            sizes: [product.sizes?.map((x) => x.name)],
            quantity: [product.quantity],
            categoryId: [product.categoryId],
            inventoryId: [product.inventoryId],
            discountId: [product.discountId],
          });
        },
      });
    }
  }

  // Add colors form the output of the custom colors component
  addColorsToForm(colorsValue: string[]) {
    this.upsertProductForm.patchValue({ colors: colorsValue });
  }

  // Add Sizes form the output of the custom sizes component
  addSizesToForm(sizesValue: string[]) {
    this.upsertProductForm.patchValue({ sizes: sizesValue });
  }

  upsertProduct() {
    // Add product form
    if (this.urlPath === 'add') {
      this.adminService
        .addProdcut(
          this.upsertProductForm.getRawValue(),
          this.upsertProductForm.get('tags')?.value,
          this.upsertProductForm.get('sizes')?.value,
          this.upsertProductForm.get('colors')?.value,
          this.upsertProductForm.get('productImages')?.value
        )
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Add new product successfully!',
              detail: `Add new product: ${
                this.upsertProductForm.get('name')?.value
              }`,
            });
            this.upsertProductForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add product failed!',
              detail: err.message,
            });
            console.log(err);
          },
        });
    } else {
      this.adminService
        .updateProdcut(
          this.upsertProductForm.getRawValue(),
          this.upsertProductForm.get('tags')?.value,
          this.upsertProductForm.get('sizes')?.value,
          this.upsertProductForm.get('colors')?.value,
          this.upsertProductForm.get('productImages')?.value
        )
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Update product successfully!',
              detail: `Update product: ${
                this.upsertProductForm.get('name')?.value
              }`,
            });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update product failed!',
              detail: err.message,
            });
            console.log(err);
          },
        });
    }
  }

  uploadFiles = (files: any) => {
    if (files.length !== 0) {
      this.adminService.uploadFiles(files, true).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.upsertProductForm.patchValue({
              productImages: res.body.dbPathList,
            });
            // this.upsertProductForm.get('productImages')?.updateValueAndValidity();
            this.upsertProduct();
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.upsertProduct();
    }
  };
}
