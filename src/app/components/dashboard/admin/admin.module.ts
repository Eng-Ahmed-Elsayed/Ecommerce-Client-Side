import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UpsertProductComponent } from './product/upsert-product/upsert-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UpsertDiscountComponent } from './discount/upsert-discount/upsert-discount.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { PickListModule } from 'primeng/picklist';
import { ViewerPagesModule } from '../../viewer-pages/viewer-pages.module';

@NgModule({
  declarations: [
    AdminComponent,
    UpsertProductComponent,
    ProductListComponent,
    UpsertCategoryComponent,
    CategoryListComponent,
    UpsertDiscountComponent,
    DiscountListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    InputSwitchModule,
    EditorModule,
    InputMaskModule,
    FileUploadModule,
    DropdownModule,
    ChipsModule,
    SelectButtonModule,
    InputNumberModule,
    TableModule,
    TagModule,
    RatingModule,
    ToastModule,
    ToolbarModule,
    InputTextareaModule,
    RouterModule,
    PickListModule,
    ViewerPagesModule,
  ],
})
export class AdminModule {}
