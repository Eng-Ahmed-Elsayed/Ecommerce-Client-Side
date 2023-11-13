import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryDto } from '../models/shared/categoryDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryApiUrl: string = environment.baseApiUrl + 'categories/';

  constructor(private httpClient: HttpClient) {}

  getCategoryList(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(this.categoryApiUrl);
  }

  getCategory(id: string): Observable<CategoryDto> {
    return this.httpClient.get<CategoryDto>(this.categoryApiUrl + id);
  }
}
