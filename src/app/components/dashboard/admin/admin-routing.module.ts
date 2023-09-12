import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/update', component: UpdateProductComponent },
  { path: 'product/delete', component: DeleteProductComponent },
  { path: 'product/all', component: DeleteProductComponent },
  // { path: 'product/id', component: DeleteProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
