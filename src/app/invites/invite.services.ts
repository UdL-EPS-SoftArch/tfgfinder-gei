// invites/invite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invite {
  id: number;
  when: string;
  status: string;
  who: { name: string };
  what: { title: string };
}

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private apiUrl = 'http://localhost:8080/api/invites';

  constructor(private http: HttpClient) {}

  getInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(this.apiUrl);
  }
}
