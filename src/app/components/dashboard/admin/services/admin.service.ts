import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/shared/categoryDto';
import { DiscountDto } from 'src/app/shared/models/shared/discountDto';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { UpsertFeatureProductsDto } from 'src/app/shared/models/shared/upsertFeatureProductsDto';
import { uploadFiles } from 'src/app/shared/services/photo.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminApiUrl: string = environment.baseApiUrl + 'admin/';
  private categoryApiUrl: string = environment.baseApiUrl + 'categories/';
  private discountApiUrl: string = environment.baseApiUrl + 'discounts/';
  private productApiUrl: string = environment.baseApiUrl + 'products/';

  constructor(private httpClient: HttpClient) {}

  // Generate new Guid
  private generateTempGuid() {
    return '9bb999a9-dffa-483a-8db6-0d1fc2dd60b2';
  }

  // Custom map for colors, sizes, tags and images
  private customMap(arr: any[] | null, id: string = '') {
    if (arr == null || arr?.length == 0) {
      return [];
    }
    if (id === '') {
      return arr.map((val: string) => ({
        id: this.generateTempGuid(),
        name: val,
      }));
    }
    // Image map is diffrent
    else {
      return arr.map((val: string) => ({
        id: this.generateTempGuid(),
        imgPath: val,
        productId: id,
      }));
    }
  }

  // <-----Category----->

  addCategory(body: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(this.categoryApiUrl, body);
  }

  updateCategory(body: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.put<CategoryDto>(
      this.categoryApiUrl + body.id,
      body
    );
  }

  uploadCategoryImage(files: any, multi: boolean = false) {
    let { url, formData } = uploadFiles(files, multi, this.categoryApiUrl);
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getCategoryList(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(this.categoryApiUrl);
  }

  getCategory(id: string): Observable<CategoryDto> {
    return this.httpClient.get<CategoryDto>(this.categoryApiUrl + id);
  }

  deleteCategory(id: string) {
    return this.httpClient.delete(this.categoryApiUrl + id);
  }

  deleteCategoryRange(body: CategoryDto[]) {
    return this.httpClient.delete(this.categoryApiUrl, { body });
  }

  // <-----Product----->
  addProdcut(
    body: ProductDto,
    tags: string[],
    sizes: string[],
    colors: string[],
    productImages: string[]
  ): Observable<ProductDto> {
    body.id = this.generateTempGuid();
    body.tags = this.customMap(tags);
    body.sizes = this.customMap(sizes);
    body.colors = this.customMap(colors);
    if (productImages != undefined) {
      body.productImages = this.customMap(productImages, body.id);
    }
    return this.httpClient.post<ProductDto>(this.productApiUrl, body);
  }

  updateProdcut(
    body: ProductDto,
    tags: string[],
    sizes: string[],
    colors: string[],
    productImages: string[]
  ): Observable<ProductDto> {
    body.tags = this.customMap(tags);
    body.sizes = this.customMap(sizes);
    body.colors = this.customMap(colors);
    if (productImages != undefined) {
      body.productImages = this.customMap(productImages, body.id);
    }
    return this.httpClient.put<ProductDto>(this.productApiUrl + body.id, body);
  }

  uploadProductImages(files: any, multi: boolean = true) {
    let { url, formData } = uploadFiles(files, multi, this.productApiUrl);
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getProductList(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(this.productApiUrl);
  }

  getProduct(id: string): Observable<ProductDto> {
    return this.httpClient.get<ProductDto>(this.productApiUrl + id);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.productApiUrl + id);
  }

  deleteProductsRange(body: ProductDto[]) {
    return this.httpClient.delete(this.productApiUrl, { body });
  }

  getFeatureProductsAndOther() {
    return this.httpClient.get<UpsertFeatureProductsDto>(
      this.productApiUrl + 'feature-products/'
    );
  }

  upsertFeatureProducts(body: UpsertFeatureProductsDto) {
    return this.httpClient.patch(
      this.productApiUrl + 'feature-products/',
      body
    );
  }

  // <-----Discount----->

  addDiscount(body: DiscountDto): Observable<DiscountDto> {
    return this.httpClient.post<DiscountDto>(this.discountApiUrl, body);
  }

  updateDiscount(body: DiscountDto): Observable<DiscountDto> {
    return this.httpClient.put<DiscountDto>(
      this.discountApiUrl + body.id,
      body
    );
  }

  getDiscountList(): Observable<DiscountDto[]> {
    return this.httpClient.get<DiscountDto[]>(this.discountApiUrl);
  }

  getDiscount(id: string): Observable<DiscountDto> {
    return this.httpClient.get<DiscountDto>(this.discountApiUrl + id);
  }

  deleteDiscount(id: string) {
    return this.httpClient.delete(this.discountApiUrl + id);
  }

  deleteDiscountRange(body: DiscountDto[]) {
    return this.httpClient.delete(this.discountApiUrl, { body });
  }
}
