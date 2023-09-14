import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  AddProduct() {
    this.adminService
      .addCategory(this.addCategoryForm.getRawValue())
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => console.log('Added new category successfully!'),
      });
  }
}
