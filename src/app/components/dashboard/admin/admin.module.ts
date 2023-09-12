import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { AllProductsComponent } from './product/all-products/all-products.component';

@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    AllProductsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
