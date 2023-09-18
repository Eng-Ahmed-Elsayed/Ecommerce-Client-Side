import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { editCategoryResolver } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent },
  // Product
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/delete', component: DeleteProductComponent },
  { path: 'product/all', component: AllProductsComponent },
  { path: 'product/update', component: UpdateProductComponent },

  // Category
  { path: 'category/add', component: UpsertCategoryComponent },
  { path: 'category/list', component: CategoryListComponent },
  {
    path: 'category/update/:id',
    component: UpsertCategoryComponent,
    resolve: { category: editCategoryResolver },
  },

  // { path: 'product/id', component:  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
