import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CheckListDto } from 'src/app/shared/models/customer/checkListDto';
import { CheckListItemDto } from 'src/app/shared/models/customer/checkListItemDto';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent {
  checkListItems!: CheckListItemDto[] | undefined;
  paginator: boolean = true;
  rows: number = 9;
  layout: 'list' | 'grid' = 'grid';

  constructor(
    private productService: ProductService,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the items from the reslover
    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.checkListItems = data.watchListItems;
      },
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  inputFilter = (event: Event) => {
    console.log(event);
    return this.utilityService.inputFilter(event);
  };

  getSeverity = (product: ProductDto) =>
    this.productService.getSeverity(product);

  filterByCategory = (category: string) =>
    this.productService.filterByCategory(category);
}
