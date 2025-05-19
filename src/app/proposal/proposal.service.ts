import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Proposal } from './proposal';

@Injectable({ providedIn: 'root' })
export class ProposalService extends HateoasResourceOperation<Proposal> {
  constructor() {
    super(Proposal);
  }

  public getResource(id: string): Observable<Proposal> {
    return super.getResource(id).pipe(
      catchError((error) => {
        console.error('Error fetching proposal:', error);
        return throwError(() => new Error('Invalid or non-existent proposal ID.'));
      })
    );
  }

  public createResource(options: { body: Proposal }): Observable<Proposal> {
    return super.createResource(options).pipe(
      catchError((error) => {
        console.error('Error creating proposal:', error);
        return throwError(() => new Error('Failed to create proposal.'));
      })
    );
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<Proposal>> {
    return this.searchCollection('findByTitle', { params: { text: query } }).pipe(
      catchError((error) => {
        console.error('Error searching proposals:', error);
        return throwError(() => new Error('Failed to search proposals.'));
      })
    );
  }
}
