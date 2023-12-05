import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import passwordMatchValidator from '../../custom-components/validators/passwordMatchValidator';

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
  currentBirthdate!: Date | undefined;
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
    // Change password form
    this.userChangePasswordForm = this.fb.group(
      {
        currentPassword: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(20),
            ],
          },
        ],
        password: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(20),
            ],
          },
        ],
        confirmPassword: [
          ,
          {
            validators: [
              Validators.required,
              Validators.minLength(7),
              Validators.maxLength(20),
            ],
          },
        ],
      },
      { validators: passwordMatchValidator, updateOn: 'blur' }
    );
    // Get the user data and set it to the form
    this.activatedRoute.data.subscribe((data) => {
      let user: UserDto = data['user'];
      this.userEmail = user.email;
      this.oldBirthdate = user.birthdate?.toString().split('T')[0];
      this.currentBirthdate = user.birthdate;
      this.oldImgPath = createImgPath(user.imgPath);

      this.updateUserForm = this.fb.group({
        firstName: [
          user.firstName,
          {
            validators: [Validators.minLength(3), Validators.maxLength(40)],
          },
        ],
        lastName: [
          user.lastName,
          {
            validators: [Validators.minLength(3), Validators.maxLength(40)],
          },
        ],
        phoneNumber: [
          user.phoneNumber,
          {
            validators: [Validators.minLength(4), Validators.maxLength(25)],
          },
        ],
        birthdate: [],
        twoFactorEnabled: [user.twoFactorEnabled],
      });
    });
    // Make the max date = now - 14 years.
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 14);
  }

  updateUser() {
    let userDto: UserDto = this.updateUserForm.getRawValue();
    if (userDto.birthdate == null || userDto.birthdate == undefined) {
      userDto.birthdate = this.currentBirthdate;
    }
    this.authService.updateUser(userDto).subscribe({
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
