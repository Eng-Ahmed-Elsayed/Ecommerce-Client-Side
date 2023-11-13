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
  @Input() products!: ProductDto[] | undefined;
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
    private route: ActivatedRoute,
    private customOverlayService: CustomOverlayService,
    private utilityService: UtilityService
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

  // Disable filter by name here after we have added a filters from the DB
  // We will solve this later.
  // inputFilter = (event: Event) => this.utilityService.inputFilter(event);

  loadProducts = (event: DataViewLazyLoadEvent) => {
    this.currentPageEvent.emit(event.first / event.rows + 1);
  };

  emitsidebarVisibleValue() {
    this.sidebarVisibleValueEmitter.emit(true);
  }
}
