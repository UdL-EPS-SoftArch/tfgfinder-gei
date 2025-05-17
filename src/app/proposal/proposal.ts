import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('proposals')
export class Proposal extends Resource {
  id: number;
  title: string;
  description: string;
  timing: string;
  speciality: string;
  kind: string;
  keywords: string;
  owner: string | User;
  student?: string;
  director?: string;
  codirector?: string;
  chat?: string;
  categories: number[] = [];

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
