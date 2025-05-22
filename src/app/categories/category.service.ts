import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HateoasResourceOperation, ResourceCollection} from '@lagoshny/ngx-hateoas-client';
import { Category } from './category';

@Injectable({ providedIn: 'root' })
export class CategoryService extends HateoasResourceOperation<Category> {
  constructor() {
    super(Category);
  }
}
