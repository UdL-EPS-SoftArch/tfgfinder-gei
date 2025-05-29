// invite-list.component.ts
import { Component, OnInit } from '@angular/core';
import { InviteService, Invite } from '../invites/invite.services';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
  invites: Invite[] = [];
  error: string = '';

  constructor(private inviteService: InviteService) {}

  ngOnInit(): void {
    this.inviteService.getInvites().subscribe({
      next: (data) => this.invites = data,
      error: (err) => this.error = 'Failed to load invites: ' + err.message
    });
  }
}
