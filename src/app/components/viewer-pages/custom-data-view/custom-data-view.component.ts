import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { Pagination } from 'src/app/shared/models/shared/pagination';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';
import { createImgPath } from 'src/app/shared/services/photo.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-custom-data-view',
  templateUrl: './custom-data-view.component.html',
  styleUrls: ['./custom-data-view.component.scss'],
})
export class CustomDataViewComponent implements OnInit {
  @Input() products!: ProductDto[] | undefined | any;
  @Input() paginator: boolean = false;
  @Input() sortOptions!: SelectItem[];
  @Input() filterBy!: string;
  @Input() rows: number = 9;
  @Input() pagination!: Pagination;
  @Input() loading: boolean = false;
  @Output() currentPageEvent = new EventEmitter<number>();

  // server-side sidebar filter.
  @Input() isSmall: boolean = false;
  @Output() sidebarVisibleValueEmitter = new EventEmitter<boolean>(false);

  sortField!: string;
  sortOrder!: number;
  sortKey!: string;

  layout: 'list' | 'grid' = 'grid';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSortChange(event: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        orderBy: event.value,
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
    });
  }

  createImgPath = (imgPath: string) => createImgPath(imgPath);

  getSeverity = (product: ProductDto) =>
    this.productService.getSeverity(product);

  loadProducts = (event: DataViewLazyLoadEvent) => {
    this.currentPageEvent.emit(event.first / event.rows + 1);
  };

  emitsidebarVisibleValue() {
    this.sidebarVisibleValueEmitter.emit(true);
  }

  filterByCategory = (category: string) =>
    this.productService.filterByCategory(category);
}
