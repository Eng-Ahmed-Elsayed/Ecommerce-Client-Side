import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CustomerModule } from '../dashboard/customer/customer.module';
import { ScrollTopModule } from 'primeng/scrolltop';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavComponent,
    ToastComponent,
    ConfirmDialogComponent,
    LayoutAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ToastModule,
    ButtonModule,
    ConfirmDialogModule,
    MatMenuModule,
    SidebarModule,
    MenuModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    DialogModule,
    FormsModule,
    CustomerModule,
    ScrollTopModule,
  ],
  exports: [NavComponent, ToastComponent, ConfirmDialogComponent],
})
export class LayoutModule {}
