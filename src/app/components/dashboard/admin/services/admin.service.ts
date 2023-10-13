import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { DiscountDto } from 'src/app/shared/models/discountDto';
import { ProductDto } from 'src/app/shared/models/productDto';
import { uploadFiles } from 'src/app/shared/services/photo.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminApiUrl: string = environment.baseApiUrl + 'admin/';
  private categoryApiUrl: string = environment.baseApiUrl + 'category/';
  private discountApiUrl: string = environment.baseApiUrl + 'discount/';
  private productApiUrl: string = environment.baseApiUrl + 'product/';

  constructor(private httpClient: HttpClient) {}

  // Create a full image path
  // public createImgPath = (imgPath: string): string => {
  //   return `${environment.baseServerUrl}${imgPath}`;
  // };

  // Generate new Guid
  private generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var uuid = (Math.random() * 16) | 0,
          v = c == 'x' ? uuid : (uuid & 0x3) | 0x8;
        return uuid.toString(16);
      }
    );
  }

  // Custom map for colors, sizes, tags and images
  private customMap(arr: any[], id: string = '') {
    if (id === '') {
      return arr.map((val: string) => ({
        id: this.generate_uuidv4(),
        name: val,
      }));
    }

    // Image map is diffrent
    else {
      return arr.map((val: string) => ({
        id: this.generate_uuidv4(),
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
    body.tags = this.customMap(tags);
    body.sizes = this.customMap(sizes);
    body.colors = this.customMap(colors);
    if (productImages != undefined) {
      body.productImages = this.customMap(productImages, body.id);
    }
    return this.httpClient.post<ProductDto>(this.productApiUrl + 'add', body);
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
    return this.httpClient.get<ProductDto[]>(this.productApiUrl + 'list');
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

  // <-----Discount----->

  addDiscount(body: DiscountDto): Observable<DiscountDto> {
    return this.httpClient.post<DiscountDto>(this.discountApiUrl + 'add', body);
  }

  updateDiscount(body: DiscountDto): Observable<DiscountDto> {
    return this.httpClient.put<DiscountDto>(
      this.discountApiUrl + body.id,
      body
    );
  }

  getDiscountList(): Observable<DiscountDto[]> {
    return this.httpClient.get<DiscountDto[]>(this.discountApiUrl + 'list');
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
