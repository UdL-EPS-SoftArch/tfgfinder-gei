import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Proposal } from './proposal';

@Injectable({providedIn: 'root'})
export class ProposalService extends HateoasResourceOperation<Proposal> {

  constructor() {
    super(Proposal);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<Proposal>> {
    return this.searchCollection('findByTitle', { params: { text: query } });
  }
}
