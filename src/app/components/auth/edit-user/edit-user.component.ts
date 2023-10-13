import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDto } from '../models/userDto';
import { MessageService } from 'primeng/api';
import {
  FileUploadEvent,
  FileUploadHandlerEvent,
  UploadEvent,
} from 'primeng/fileupload';
import { createImgPath } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userChangePasswordForm!: FormGroup;
  updateUserForm!: FormGroup;
  userEmail!: string | undefined;
  oldBirthdate!: string | undefined;
  oldImgPath!: string | undefined;

  uploadedFiles: any[] = [];
  minDate: Date = new Date(1920);
  maxDate: Date = new Date(Date.now());

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userChangePasswordForm = this.fb.group({
      currentPassword: [],
      password: [],
      confirmPassword: [],
    });
    this.activatedRoute.data.subscribe((data) => {
      let user: UserDto = data['user'];
      this.userEmail = user.email;
      this.oldBirthdate = user.birthdate?.toString().split('T')[0];
      this.oldImgPath = createImgPath(user.imgPath);
      // this.oldBirthdate = `${user.birthdate?.getDate()}/${user.birthdate?.getMonth()}/${user.birthdate?.getFullYear()}`;

      this.updateUserForm = this.fb.group({
        firstName: [user.firstName],
        lastName: [user.lastName],
        phoneNumber: [user.phoneNumber],
        birthdate: [user.birthdate],
        twoFactorEnabled: [user.twoFactorEnabled],
      });
    });
  }

  updateUser() {
    this.authService.updateUser(this.updateUserForm.getRawValue()).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated successfully!',
          detail: 'Your information has beed updated successfully!',
        });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Update failed!',
          detail: JSON.stringify(err.error.errors),
        });
        console.log(err);
      },
    });
  }
  updateUserPassword() {
    this.authService
      .userChangePassword(this.userChangePasswordForm.getRawValue())
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated successfully!',
            detail: 'Your password has beed updated successfully!',
          });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update failed!',
            detail: JSON.stringify(err.error.errors),
          });
          console.log(err);
        },
      });
  }

  uploadUserImg(event: FileUploadHandlerEvent) {
    let files = event.files;
    if (files.length !== 0) {
      this.authService.uploadUserImage(files).subscribe({
        next: (res: any) => {
          if (res.type === HttpEventType.Response) {
            this.messageService.add({
              severity: 'info',
              summary: 'File Uploaded',
              detail: 'Your profile image has been updated.',
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'File upload failed!',
            detail: 'Failed to update your profile image.',
          });
        },
      });
    }
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);
}
