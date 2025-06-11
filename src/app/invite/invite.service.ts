import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private apiUrl = `${environment.API}/invites`;

  constructor(private http: HttpClient) { }

  createInvite(invite: any): Observable<any> {
    return this.http.post(this.apiUrl, invite);
  }

  getInvitesByProposal(proposalId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/findByProposalId?proposalId=${proposalId}`);
  }

  acceptInvite(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      status: 'ACCEPTED'
    });
  }

  rejectInvite(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      status: 'REJECTED'
    });
  }
  getAllInvites(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getReceivedInvites(userUri: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/findByWho?who=${userUri}`);
  }
}
