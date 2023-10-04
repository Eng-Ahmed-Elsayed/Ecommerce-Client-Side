import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLarge$!: Observable<boolean>;

  cartVisible: boolean = false;
  userMenuItems: MenuItem[] | undefined;
  billMenuItems: MenuItem[] | undefined;
  searchForProductVisible!: boolean;
  searchValue!: string;

  constructor(
    private messageService: MessageService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.userMenuItems = [
      {
        label: 'Options',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
              this.update();
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.delete();
            },
          },
        ],
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-external-link',
            url: 'http://angular.io',
          },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload',
          },
        ],
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
    this.layoutService.getIsLarge().subscribe((x) => {
      this.isLarge$ = x;
    });
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
