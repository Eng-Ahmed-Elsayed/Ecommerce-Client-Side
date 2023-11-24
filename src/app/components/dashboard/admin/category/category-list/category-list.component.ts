import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { CategoryDto } from 'src/app/shared/models/shared/categoryDto';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories!: CategoryDto[];
  category!: CategoryDto;
  selectedCategories!: CategoryDto[];

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.adminService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.log(err),
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  inputFilter = (event: Event) => this.utilityService.inputFilter(event);

  openNew() {
    // this.category = {};
    // this.submitted = false;
    // this.categoryDialog = true;
  }

  editCategory(category: CategoryDto) {
    // this.category = { ...category };
    // this.categoryDialog = true;
  }

  deleteCategory(category: CategoryDto) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete: ${category.name}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (category.id !== undefined) {
          this.adminService.deleteCategory(category.id).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Delete category successfully!',
                detail: `Selected category (${category.name}) have been removed successfully!`,
              });
              this.categories = this.categories.filter(
                (val) => val.id !== category.id
              );
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Delete category failed!',
                detail: err.message,
              });
              console.log(err);
            },
          });
        }
      },
    });
  }

  deleteSelectedCategories() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected categorys?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService
          .deleteCategoryRange(this.selectedCategories)
          .subscribe({
            next: (res) => {
              this.categories = this.categories.filter(
                (val) => !this.selectedCategories?.includes(val)
              );
              this.selectedCategories = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Categories Deleted',
                detail: 'Selected categories have been removed successfully!',
                life: 3000,
              });
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Delete category range failed!',
                detail: err.message,
              });
              console.log(err);
            },
          });
      },
    });
  }
}
