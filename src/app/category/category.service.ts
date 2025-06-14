import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = '/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  update(id: number, category: Category): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, category);
  }

  create(category: Category): Observable<any> {
    return this.http.post(this.baseUrl, category);
  }
} 
