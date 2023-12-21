import { Component, OnInit } from '@angular/core';

import { Observable, filter, map } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { ShoppingCartDto } from 'src/app/shared/models/customer/shoppingCartDto';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLarge$!: Observable<boolean>;
  isAuthenticated!: boolean;
  userRole!: string;
  username!: string;
  userImgPath!: string;
  isAuthForm!: boolean;

  cartVisible: boolean = false;
  // cartItems: CartItemDto[] | undefined;

  userMenuItems: MenuItem[] | undefined;
  anonymousMenuItems: MenuItem[] | undefined;
  billMenuItems: MenuItem[] | undefined;
  searchForProductVisible!: boolean;
  searchValue: string = '';

  constructor(
    private messageService: MessageService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    // If it is an auth page with form like(login, ...etc) but not edit-user page.
    // first filter router events and get NavigationEnd then map it and get the url
    // then check if it is an auth page with form or not.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .pipe(
        map((x) =>
          x.url.startsWith('/auth') && !x.url.endsWith('/edit-user')
            ? true
            : false
        )
      )
      .subscribe((isAuthForm) => {
        this.isAuthForm = isAuthForm;
      });

    // If the screen is large or no
    this.layoutService.getIsLarge().subscribe((isLarge) => {
      this.isLarge$ = isLarge;
    });
    // User informations
    this.authService.authChange.subscribe((value) => {
      this.isAuthenticated = value;
      // If auth get the username, profile img and user role.
      if (this.isAuthenticated) {
        this.username = this.authService.getUsername();
        this.userImgPath =
          this.authService.getUserImgPath() === ''
            ? '../../../../assets/images/user/default-user-image.png'
            : this.authService.getUserImgPath();
        this.userRole = this.authService.getUserRole();
      }
    });

    this.userMenuItems = [
      {
        label: 'Information',
        icon: 'pi pi-user-edit',
        routerLink: '/auth/edit-user',
      },
      {
        label: 'My Cart',
        icon: 'pi pi-shopping-bag',
        routerLink: '/dashboard/user/cart',
      },
      {
        label: 'My Watchlist',
        icon: 'pi pi-heart',
        routerLink: '/dashboard/user/watchlist',
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
        label: 'Orders History',
        icon: 'pi pi-history',
        routerLink: '/dashboard/user/orders-history',
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
    // this.billMenuItems = [
    //   {
    //     label: 'New Order',
    //     items: [
    //       {
    //         tooltip: 'dsfsf',
    //         label: 'You have 3 new orders.',
    //         icon: 'pi pi-shopping-cart',
    //       },
    //       {
    //         label: 'Delete',
    //         icon: 'pi pi-times',
    //       },
    //     ],
    //   },
    // ];
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

  searchForProducts() {
    this.router.navigate(['/products'], {
      queryParams: { name: this.searchValue },
    });
    this.searchValue = '';
    this.searchForProductVisible = false;
  }
}
