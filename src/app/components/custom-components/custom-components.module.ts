import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputErrorComponent } from './custom-input-error/custom-input-error.component';
import { MatInputModule } from '@angular/material/input';
import { ShoppingCartButtonComponent } from './shopping-cart-button/shopping-cart-button.component';
import { ButtonModule } from 'primeng/button';
import { CheckListButtonComponent } from './check-list-button/check-list-button.component';
import { GenericInputErrorsComponent } from './generic-input-errors/generic-input-errors.component';

@NgModule({
  declarations: [
    CustomInputErrorComponent,
    ShoppingCartButtonComponent,
    CheckListButtonComponent,
    GenericInputErrorsComponent,
  ],
  imports: [CommonModule, MatInputModule, ButtonModule],
  exports: [
    CustomInputErrorComponent,
    ShoppingCartButtonComponent,
    CheckListButtonComponent,
    GenericInputErrorsComponent,
  ],
})
export class CustomComponentsModule {}
