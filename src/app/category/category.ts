import { Resource } from '@lagoshny/ngx-hateoas-client';

export class Category extends Resource {
  id?: number;
  name: string = '';
  description?: string;
}
