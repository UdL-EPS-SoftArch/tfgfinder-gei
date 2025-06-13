import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  constructor(private http: HttpClient) {}

  getInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(`${environment.API}/invites`);
  }
}