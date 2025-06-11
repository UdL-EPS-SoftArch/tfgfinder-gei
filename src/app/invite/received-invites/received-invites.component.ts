import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InviteService } from '../invite.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-received-invites',
  templateUrl: './received-invites.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReceivedInvitesComponent implements OnInit {
  invites: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private inviteService: InviteService,
    private authService: AuthenticationBasicService
  ) { }

  ngOnInit(): void {
    this.fetchReceivedInvites();
  }

  fetchReceivedInvites(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.uri) {
      this.error = 'No user logged in or user URI not available';
      this.loading = false;
      return;
    }

    const normalizeUri = (uri: string): string => {
      if (!uri) return '';
      const match = uri.match(/\/users\/[^/]+$/);
      return match ? match[0] : uri;
    };

    this.inviteService.getAllInvites().subscribe({
      next: (data: any) => {
        const allInvites: any[] = data._embedded?.invites || [];
        const filteredInvites: any[] = [];

        // Sequentially fetch 'who' for each invite and filter
        let pending = allInvites.length;
        if (pending === 0) {
          this.invites = [];
          this.loading = false;
        }

        allInvites.forEach(invite => {
          this.http.get<any>(invite._links.who.href).subscribe(user => {
            invite.who = user;

            if (
              normalizeUri(user.uri) === normalizeUri(currentUser.uri)
            ) {
              filteredInvites.push(invite);
            }

            // Also fetch proposal title
            this.http.get<any>(invite._links.what.href).subscribe(proposal => {
              invite.what = proposal;
            });

            pending--;
            if (pending === 0) {
              this.invites = filteredInvites;
              this.loading = false;
            }
          }, () => {
            pending--;
            if (pending === 0) {
              this.invites = filteredInvites;
              this.loading = false;
            }
          });
        });
      },
      error: (err) => {
        this.error = 'Failed to load received invites';
        this.loading = false;
        console.error('Error loading invites:', err);
      }
    });








}

  acceptInvite(invite: any): void {
    this.inviteService.acceptInvite(invite.id).subscribe({
      next: () => {
        console.log('Invite accepted:', invite);
        this.fetchReceivedInvites(); // Refresh the list
      },
      error: (err) => {
        console.error('Error accepting invite:', err);
        alert('Failed to accept invite. Please try again.');
      }
    });
  }

  rejectInvite(invite: any): void {
    this.inviteService.rejectInvite(invite.id).subscribe({
      next: () => {
        console.log('Invite rejected:', invite);
        this.fetchReceivedInvites(); // Refresh the list
      },
      error: (err) => {
        console.error('Error rejecting invite:', err);
        alert('Failed to reject invite. Please try again.');
      }
    });
  }
}
