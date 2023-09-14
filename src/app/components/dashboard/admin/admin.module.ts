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
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AllCategoriesComponent } from './category/all-categories/all-categories.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    AllProductsComponent,
    AddCategoryComponent,
    AllCategoriesComponent,
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
  ],
})
export class AdminModule {}
