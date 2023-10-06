import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputErrorComponent } from './custom-input-error/custom-input-error.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CustomInputErrorComponent],
  imports: [CommonModule, MatInputModule],
  exports: [CustomInputErrorComponent],
})
export class CustomComponentsModule {}
