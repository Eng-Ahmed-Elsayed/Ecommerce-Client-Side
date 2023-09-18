import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
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
import { AppModule } from 'src/app/app.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    AllProductsComponent,
    UpsertCategoryComponent,
    CategoryListComponent,
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
  ],
})
export class AdminModule {}
