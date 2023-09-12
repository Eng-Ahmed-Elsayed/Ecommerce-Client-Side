import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  uploadedFiles: any[] = [];
  // From the api
  statusOptions!: any[];
  caregoryOptions!: any[];
  stockOptions!: any[];
  colorStateOptions!: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: [''],
      price: [null],
      code: [''],
      sku: [''],
      details: [''],
      images: [''],
      status: ['draft'],
      tags: new FormControl<string[] | null>(null),
      category: [''],
      colors: [''],
      stock: [''],
      inStock: [''],
    });

    this.statusOptions = [
      { status: 'Draft', value: 'draft' },
      { status: 'Publish', value: 'publish' },
    ];
    this.caregoryOptions = [
      { categoryName: 'Tvs', value: 'tvs' },
      { categoryName: 'Mobiles', value: 'mobiles' },
    ];
    this.stockOptions = [
      { stockName: 'Sneakers', value: 'sneakers' },
      { stockName: 'Apparel', value: 'apparel' },
      { stockName: 'Etc', value: 'etc' },
    ];
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
      this.addProductForm.get('images')?.updateValueAndValidity();
    }
  }

  AddProduct() {
    console.log(this.addProductForm.getRawValue());
  }
}
