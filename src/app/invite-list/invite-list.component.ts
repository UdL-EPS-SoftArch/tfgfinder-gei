import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Invite {
  id: number;
  when: string;
  status: string;
  who: { name: string };
  what: { title: string };
}

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
  invites: Invite[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Invite[]>('http://localhost:8080/api/invites').subscribe({
      next: (data) => this.invites = data,
      error: (err) => this.error = 'Failed to load invites: ' + err.message
    });
  }
}
