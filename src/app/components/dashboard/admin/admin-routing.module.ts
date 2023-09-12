import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'prodcut/add', component: AddProductComponent },
  { path: 'prodcut/update', component: UpdateProductComponent },
  { path: 'prodcut/delete', component: DeleteProductComponent },
  { path: 'prodcut/all', component: DeleteProductComponent },
  // { path: 'prodcut/id', component: DeleteProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
