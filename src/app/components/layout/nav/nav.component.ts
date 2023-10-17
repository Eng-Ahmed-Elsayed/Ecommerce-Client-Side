import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLarge$!: Observable<boolean>;
  isAuthenticated!: boolean;
  username!: string;
  userImgPath!: string;

  cartVisible: boolean = false;
  userMenuItems: MenuItem[] | undefined;
  anonymousMenuItems: MenuItem[] | undefined;
  billMenuItems: MenuItem[] | undefined;
  searchForProductVisible!: boolean;
  searchValue!: string;

  constructor(
    private messageService: MessageService,
    private layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.layoutService.getIsLarge().subscribe((isLarge) => {
      this.isLarge$ = isLarge;
    });
    this.authService.authChange.subscribe((value) => {
      this.isAuthenticated = value;
      if (this.isAuthenticated) {
        this.username = this.authService.getUsername();
        this.userImgPath =
          this.authService.getUserImgPath() === ''
            ? '../../../../assets/images/user/default-user-image.png'
            : this.authService.getUserImgPath();
      }
    });
    this.userMenuItems = [
      {
        label: 'Information',
        icon: 'pi pi-user-edit',
        routerLink: '/auth/edit-user',
      },
      {
        label: 'Addresses',
        icon: 'pi pi-map-marker',
        routerLink: '/dashboard/user/address',
      },
      {
        label: 'Payments',
        icon: 'pi pi-id-card',
        routerLink: '/dashboard/user/payment',
      },
      {
        label: 'Orders',
        icon: 'pi pi-shopping-bag',
        routerLink: '/dashboard/check-out',
      },
      {
        label: 'Order History',
        icon: 'pi pi-history',
        routerLink: '/dashboard/order-history',
      },
      {
        label: 'My Watchlist',
        icon: 'pi pi-heart',
        routerLink: '/dashboard/order-history',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        routerLink: '/',
        command: () => this.authService.logoutUser(),
      },
    ];
    this.anonymousMenuItems = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/auth/login',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/auth/register',
      },
    ];
    this.billMenuItems = [
      {
        label: 'New Order',
        items: [
          {
            tooltip: 'dsfsf',
            label: 'You have 3 new orders.',
            icon: 'pi pi-shopping-cart',
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
          },
        ],
      },
    ];
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }

  showDialog() {
    this.searchForProductVisible = true;
  }
}
