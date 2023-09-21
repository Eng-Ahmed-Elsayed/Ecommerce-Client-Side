import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CategoryDto } from 'src/app/shared/models/categoryDto';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  uploadedFiles: any[] = [];
  statusOptions!: any[];
  // From the api
  caregoryOptions!: CategoryDto[];
  colorStateOptions!: any[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
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
      quantity: [1],
      // discountValue: [''],
      categoryId: [''],
      // inventoryId: [''],
      // discountId: [''],
    });

    this.statusOptions = [
      { status: 'Draft', value: 'draft' },
      { status: 'Publish', value: 'publish' },
    ];
    // Get all categories
    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        console.log(data.categoryList);
        this.caregoryOptions = data.categoryList;
      },
    });

    this.colorStateOptions = [
      { productColor: 'dark-gray', value: 'darkGray' },
      { productColor: 'green', value: 'green' },
      { productColor: 'blue', value: 'blue' },
    ];
  }
  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.addProductForm.patchValue({ images: file });
      this.addProductForm.get('productImages')?.updateValueAndValidity();
    }
  }

  AddProduct() {
    this.adminService
      .addProdcut(
        this.addProductForm.getRawValue(),
        this.addProductForm.get('tags')?.value,
        this.addProductForm.get('colors')?.value,
        this.addProductForm.get('productImages')?.value
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Add new product successfully!',
            detail: `Add new product: ${
              this.addProductForm.get('name')?.value
            }`,
          });
          this.addProductForm.reset();
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
  }

  uploadFiles = (files: any) => {
    if (files.length !== 0) {
      this.adminService.uploadFiles(files, true).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            console.log('Upload image success.');
            console.log('-----------------');
            this.addProductForm.patchValue({
              productImages: res.body.dbPathList,
            });
            // this.addProductForm.get('productImages')?.updateValueAndValidity();
            this.AddProduct();
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.AddProduct();
    }
  };
}
