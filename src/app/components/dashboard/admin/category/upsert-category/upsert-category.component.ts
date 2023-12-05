import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/shared/categoryDto';

@Component({
  selector: 'app-upsert-category',
  templateUrl: './upsert-category.component.html',
  styleUrls: ['./upsert-category.component.scss'],
})
export class UpsertCategoryComponent implements OnInit {
  upsertCategoryForm!: FormGroup;
  response: any = { dbPath: '' };
  uploadedFiles: any[] = [];
  urlPath: string = this.activatedRoute.snapshot.url[1].path;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Add category form

    this.upsertCategoryForm = this.fb.group({
      name: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40),
          ],
        },
      ],
      description: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
          ],
        },
      ],
      imgPath: [''],
    });

    // Update category form
    if (this.urlPath !== 'add') {
      this.activatedRoute.data.subscribe({
        next: (data: any) => {
          let category: CategoryDto = data.category;
          this.upsertCategoryForm.reset({
            name: category.name,
            description: category.description,
            imgPath: category.imgPath,
          });
          this.upsertCategoryForm.addControl(
            'id',
            new FormControl(category.id)
          );
        },
      });
    }
  }

  upsertCategory() {
    // Add category
    if (this.urlPath === 'add') {
      this.adminService
        .addCategory(this.upsertCategoryForm.getRawValue())
        .subscribe({
          next: (res: CategoryDto) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Add new category successfully!',
              detail: `Add new category: ${res.name}`,
            });
            this.upsertCategoryForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Add category failed!',
              detail: err.message,
            });
            console.log(err);
          },
        });
    } else {
      this.adminService
        .updateCategory(this.upsertCategoryForm.getRawValue())
        .subscribe({
          next: (res: CategoryDto) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Update category successfully!',
              detail: `Update category: ${res.name}`,
            });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update category failed!',
              detail: err.message,
            });
            console.log(err);
          },
        });
    }
  }
  // Upload the image first then add or update the category
  uploadFiles = (files: any) => {
    if (files.length !== 0) {
      this.adminService.uploadCategoryImage(files).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.upsertCategoryForm.patchValue({ imgPath: res.body.dbPath });
            this.upsertCategory();
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.upsertCategory();
    }
  };

  // onUpload(event: FileUploadEvent) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }
}
