import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private apiUrl = `${environment.API}/interests`;

  constructor(private http: HttpClient) { }

  getAllInterests(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getInterestsByProposalOwner(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/findByProposalOwnerUsername?username=${username}`);
  }

  acceptInterest(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      status: 'ACCEPTED'
    });
  }

  rejectInterest(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      status: 'REJECTED'
    });
  }

  getUserByHref(href: string): Observable<any> {
    return this.http.get<any>(href);
  }

  getProposalByHref(href: string): Observable<any> {
    return this.http.get<any>(href);
  }

  createInterest(interest: any): Observable<any> {
    return this.http.post(this.apiUrl, interest);
  }
} 