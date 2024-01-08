import { Injectable } from '@angular/core';
import { Product } from '../models/shared/product';
import { ProductDto } from '../models/shared/productDto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductParameters } from '../models/shared/productParameters';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl: string = environment.baseApiUrl + 'products/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Product severity
  getSeverity(product: ProductDto) {
    switch (product.inventory?.status) {
      case 'IN STOCK':
        return 'success';

      case 'LOW STOCK':
        return 'warning';

      case 'OUT OF STOCK':
        return 'danger';

      default:
        return 'danger';
    }
  }

  // Default product colors
  getColors() {
    return [
      { productColor: 'blue-gray', value: 'blue-gray' },
      { productColor: 'green', value: 'green' },
      { productColor: 'dark-yellow', value: 'dark-yellow' },
      { productColor: 'yellow', value: 'yellow' },
      { productColor: 'dark-pink', value: 'dark-pink' },
      { productColor: 'cyan', value: 'cyan' },
      { productColor: 'dark-blue', value: 'dark-blue' },
      { productColor: 'pink', value: 'pink' },
      { productColor: 'blue', value: 'blue' },
      { productColor: 'dark-cyan', value: 'dark-cyan' },
      { productColor: 'dark-green', value: 'dark-green' },
      { productColor: 'dark-gray', value: 'dark-gray' },
    ];
  }

  // Default product sizes
  getSizes() {
    return [
      { label: 'XS', value: 'xs' },
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
      { label: 'XL', value: 'xl' },
      { label: '2X', value: '2x' },
      { label: '3X', value: '3x' },
      { label: '20', value: '20' },
      { label: '21', value: '21' },
      { label: '22', value: '22' },
      { label: '33', value: '33' },
      { label: '44', value: '44' },
      { label: '28', value: '28' },
    ];
  }

  // API end points
  getProductList(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(this.productApiUrl);
  }

  getProduct(id: string): Observable<ProductDto> {
    return this.httpClient.get<ProductDto>(this.productApiUrl + id);
  }

  searchAndFilterProducts(
    productParameters: ProductParameters
  ): Observable<HttpResponse<ProductDto[]>> {
    let params = new HttpParams({ fromObject: productParameters });
    return this.httpClient.get<ProductDto[]>(this.productApiUrl + 'search', {
      params,
      observe: 'response',
    });
  }

  filterByCategory(category: string) {
    this.router.navigate(['/products'], {
      queryParams: { category: category },
    });
  }
}
