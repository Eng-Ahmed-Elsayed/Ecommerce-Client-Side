import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/shared/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products!: ProductDto[];
  product!: ProductDto;
  selectedProducts!: ProductDto[];

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private utilityService: UtilityService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // this.productService.getProducts().then((data) => (this.products = data));
    this.adminService.getProductList().subscribe({
      next: (res: ProductDto[]) => {
        this.products = res;
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });
  }

  inputFilter = (event: Event) => this.utilityService.inputFilter(event);

  getSeverity = (product: ProductDto) =>
    this.productService.getSeverity(product);

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  openNew() {
    // this.product = {};
    // this.submitted = false;
    // this.productDialog = true;
  }

  editProduct(product: Product) {
    // this.product = { ...product };
    // this.productDialog = true;
  }

  deleteProduct(product: ProductDto) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete: ${product.name}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (product.id !== undefined) {
          this.adminService.deleteProduct(product.id).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Delete product successfully!',
                detail: `Selected product (${product.name}) have been removed successfully!`,
              });
              this.products = this.products.filter(
                (val) => val.id !== product.id
              );
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Delete product failed!',
                detail: err.message,
              });
              console.log(err);
            },
          });
        }
      },
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteProductsRange(this.selectedProducts).subscribe({
          next: (res) => {
            this.products = this.products.filter(
              (val) => !this.selectedProducts?.includes(val)
            );
            this.selectedProducts = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Products Deleted',
              detail: 'Selected products have been removed successfully!',
              life: 3000,
            });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete product range failed!',
              detail: err.message,
            });
            console.log(err);
          },
        });
      },
    });
  }
}
