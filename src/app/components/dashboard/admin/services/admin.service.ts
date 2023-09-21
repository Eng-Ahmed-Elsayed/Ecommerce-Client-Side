import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { ProductDto } from 'src/app/shared/models/productDto';
import { TagDto } from 'src/app/shared/models/tagDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminApiUrl: string = environment.baseApiUrl + 'admin/';
  private categoryApiUrl: string = this.adminApiUrl + 'category/';
  private productyApiUrl: string = environment.baseApiUrl + 'product/';
  private clientURI: string = environment.clientURI;

  constructor(private httpClient: HttpClient) {}

  // Create a full image path
  public createImgPath = (imgPath: string): string => {
    return `${environment.baseServerUrl}${imgPath}`;
  };

  // Upload Files
  uploadFiles = (files: any, multi: boolean = false): any => {
    let url: string = this.adminApiUrl;
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    if (multi) {
      url += 'upload-files';
      let filesToUpload: File[] = files;
      Array.from(filesToUpload).map((file, index) => {
        return formData.append('file' + index, file, file.name);
      });
    } else {
      url += 'upload-file';
      let fileToUpload = <File>files[0];
      formData.append('file', fileToUpload, fileToUpload.name);
    }
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  };

  // <-----Category----->

  addCategory(body: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(this.categoryApiUrl + 'add', body);
  }

  updateCategory(body: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.put<CategoryDto>(
      this.categoryApiUrl + body.id,
      body
    );
  }

  getCategoryList(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(this.categoryApiUrl + 'list');
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
    colors: string[],
    productImages: string[]
  ): Observable<ProductDto> {
    body.tags = tags.map((val: string) => {
      return {
        id: this.generate_uuidv4(),
        name: val,
      };
    });
    body.colors = colors.map((val: string) => {
      return {
        id: this.generate_uuidv4(),
        name: val,
      };
    });

    body.productImages = productImages.map((val: string) => {
      return {
        id: this.generate_uuidv4(),
        imgPath: val,
      };
    });
    return this.httpClient.post<ProductDto>(this.productyApiUrl + 'add', body);
  }

  getProductList(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(this.productyApiUrl + 'list');
  }

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
}
