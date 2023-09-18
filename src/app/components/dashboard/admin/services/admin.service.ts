import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminApiUrl: string = environment.baseApiUrl + 'admin/';
  private categoryApiUrl: string = this.adminApiUrl + 'category/';
  private clientURI: string = environment.clientURI;

  constructor(private httpClient: HttpClient) {}

  //
  public createImgPath = (serverPath: string): string => {
    return `${environment.baseServerUrl}${serverPath}`;
  };

  uploadFile = (files: any, oldImgPath: string = ''): any => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.httpClient.post(this.adminApiUrl + 'upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  };

  // Category

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
}
