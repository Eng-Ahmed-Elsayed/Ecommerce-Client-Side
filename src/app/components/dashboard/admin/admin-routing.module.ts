import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  // Product
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/update', component: UpdateProductComponent },
  { path: 'product/delete', component: DeleteProductComponent },
  { path: 'product/all', component: AllProductsComponent },
  // Category
  { path: 'category/add', component: AddCategoryComponent },

  // { path: 'product/id', component:  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
