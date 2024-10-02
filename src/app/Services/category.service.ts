import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/envrionments/envrionmets.dev';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly CategoryDirectory: string = 'Category';
  constructor(private http: HttpClient) {}

  addCategory(data: any) {
    return this.http.post(
      `${environment.ServiceUrl}${this.CategoryDirectory}/AddCategory`,
      data
    );
  }

  getAllCategory() {
    return this.http.get(
      `${environment.ServiceUrl}${this.CategoryDirectory}/GetAllCategories`
    );
  }
}
