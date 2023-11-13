import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputErrorComponent } from './custom-input-error/custom-input-error.component';
import { MatInputModule } from '@angular/material/input';
import { ShoppingCartButtonComponent } from './shopping-cart-button/shopping-cart-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CustomInputErrorComponent, ShoppingCartButtonComponent],
  imports: [CommonModule, MatInputModule, ButtonModule],
  exports: [CustomInputErrorComponent, ShoppingCartButtonComponent],
})
export class CustomComponentsModule {}
