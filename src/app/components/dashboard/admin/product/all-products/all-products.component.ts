import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products!: Product[];
  product!: Product;
  selectedProducts!: Product[] | null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().then((data) => (this.products = data));
  }

  inputFilter(event: Event) {
    return (event.target as HTMLTextAreaElement)?.value;
  }
  getSeverity = (product: Product) => this.productService.getSeverity(product);

  openNew() {
    // this.product = {};
    // this.submitted = false;
    // this.productDialog = true;
  }

  editProduct(product: Product) {
    // this.product = { ...product };
    // this.productDialog = true;
  }

  deleteProduct(product: Product) {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete ' + product.name + '?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => val.id !== product.id);
    //         this.product = {};
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //     }
    // });
  }

  deleteSelectedProducts() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected products?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
    //         this.selectedProducts = null;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     }
    // });
  }
}
