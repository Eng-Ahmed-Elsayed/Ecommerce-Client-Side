import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private bassApiUrl: string = environment.baseApiUrl + 'admin/';
  private categoryApiUrl: string = environment.baseApiUrl + 'admin/';

  constructor(private httpClient: HttpClient) {}

  addCategory(body: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(this.categoryApiUrl + 'add', body);
  }
}
