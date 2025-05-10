import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterestService {
  createInterest(proposalId: number) {
    return of({ success: true }); // Simulate success
  }
}
