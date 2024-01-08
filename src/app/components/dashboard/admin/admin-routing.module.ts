import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UpsertProductComponent } from './product/upsert-product/upsert-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import {
  getCategoryListResolver,
  getCategoryResolver,
  getDiscountResolver,
  getProductListResolver,
  getProductResolver,
} from './guards/admin.guard';
import { UpsertDiscountComponent } from './discount/upsert-discount/upsert-discount.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { UpsertFeatureProductsComponent } from './product/upsert-feature-products/upsert-feature-products.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  // Product
  {
    path: 'product/add',
    component: UpsertProductComponent,
    resolve: { categoryList: getCategoryListResolver },
  },
  { path: 'product/all', component: ProductListComponent },
  {
    path: 'product/update/:id',
    component: UpsertProductComponent,
    resolve: {
      categoryList: getCategoryListResolver,
      product: getProductResolver,
    },
  },
  { path: 'product/featrue/update', component: UpsertFeatureProductsComponent },

  // Category
  { path: 'category/add', component: UpsertCategoryComponent },
  { path: 'category/list', component: CategoryListComponent },
  {
    path: 'category/update/:id',
    component: UpsertCategoryComponent,
    resolve: { category: getCategoryResolver },
  },

  // Discount
  { path: 'discount/add', component: UpsertDiscountComponent },
  { path: 'discount/list', component: DiscountListComponent },
  {
    path: 'discount/update/:id',
    component: UpsertDiscountComponent,
    resolve: {
      discount: getDiscountResolver,
    },
  },

  // { path: 'product/id', component:  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
