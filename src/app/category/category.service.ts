import { Injectable } from '@angular/core';
import {
  HateoasResourceOperation,
  ResourceCollection
} from '@lagoshny/ngx-hateoas-client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from './category';

@Injectable({ providedIn: 'root' })
export class CategoryService extends HateoasResourceOperation<Category> {
  constructor() {
    super(Category);
  }

  getAll(): Observable<ResourceCollection<Category>> {
    return this.getPage({ pageParams: { page: 0, size: 100 } }).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Failed to load categories.'));
      })
    );
  }

  getResourceById(id: number): Observable<Category> {
    return this.getResource(id).pipe(
      catchError(error => {
        console.error('Error fetching category:', error);
        return throwError(() => new Error('Failed to load category.'));
      })
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.createResource({ body: category }).pipe(
      catchError(error => {
        console.error('Error creating category:', error);
        return throwError(() => new Error('Failed to create category.'));
      })
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.updateResource(category).pipe(
      catchError(error => {
        console.error('Error updating category:', error);
        return throwError(() => new Error('Failed to update category.'));
      })
    );
  }

  findByName(name: string): Observable<ResourceCollection<Category>> {
    return this.searchCollection('findByName', {
      params: { name }
    }).pipe(
      catchError(error => {
        console.error('Error searching category by name:', error);
        return throwError(() => new Error('Failed to search category.'));
      })
    );
  }
}
