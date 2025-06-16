import {HateoasResource, Resource} from '@lagoshny/ngx-hateoas-client';

@HateoasResource('categories')
export class Category extends Resource {
  id?: number;
  name: string = '';
  description?: string;
}
