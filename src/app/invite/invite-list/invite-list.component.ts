import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InviteService } from '../invite.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { environment } from '../../../environments/environment';
import { User } from '../../login-basic/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class InviteListComponent implements OnInit {
  proposals: any[] = [];
  searchResults: { [key: string]: any[] } = {};
  searchTerms: { [key: string]: string } = {};
  loading = true;
  error: string | null = null;
  inviteInputs: { [proposalId: string]: string } = {};

  constructor(
    private http: HttpClient,
    private inviteService: InviteService,
    private authService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    console.log('InviteListComponent initialized');
    this.loadMyProposals();
  }

  loadMyProposals() {
    console.log('loadMyProposals started');
    const currentUser = this.authService.getCurrentUser();
    console.log('Current User object:', currentUser);

    // Fetch all proposals instead of filtering by owner
    this.http.get<any>(`${environment.API}/proposals`).subscribe({
      next: (data) => {
        console.log('All proposals data:', data);
        this.proposals = data._embedded?.proposals || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load proposals';
        this.loading = false;
        console.error('Error loading proposals:', err);
      }
    });
  }

  inviteUser(proposalId: string, user: any) {
    const invite = {
      who: user._links.self.href,
      what: `${environment.API}/proposals/${proposalId}`,
      when: new Date().toISOString(),
      status: 'PENDING'
    };

    this.inviteService.createInvite(invite).subscribe({
      next: () => {
        alert(`Invite sent to ${user.username}`);
        this.searchResults[proposalId] = [];
        this.searchTerms[proposalId] = '';
      },
      error: (err) => {
        console.error('Error sending invite:', err);
        alert('Failed to send invite. Please try again.');
      }
    });
  }

  sendInvite(proposal: any): void {
    const username = this.inviteInputs[proposal.id];

    if (!username) {
      alert("Please enter a username");
      return;
    }

    console.log(`Sending invite to ${username} for proposal ${proposal.title}`);

    // Call your invitation API - Assuming an endpoint to get user by username
    // Corrected endpoint and parameter name based on UserRepository
    this.http.get<any>(`${environment.API}/users/search/findByIdContaining?text=${username}`).subscribe({
      next: (userData) => {
        console.log('User search API response data:', userData);
        const users = userData._embedded?.users || [];
        if (users.length > 0) {
          const targetUser = users[0]; // Assuming the first user is the correct one
          const invite = {
            who: targetUser._links.self.href, // Use the self link from the found user
            what: proposal._links.self.href, // Use the self link of the proposal
            when: new Date().toISOString(),
            status: 'PENDING'
          };

          this.inviteService.createInvite(invite).subscribe({
            next: () => {
              alert(`Invite sent to ${targetUser.username}`);
              this.inviteInputs[proposal.id] = ''; // Clear the input field
            },
            error: (err) => {
              console.error('Error sending invite:', err);
              alert('Failed to send invite. Please try again.');
            }
          });
        } else {
          alert(`User with username ${username} not found.`);
        }
      },
      error: (err) => {
        console.error('Error searching for user to invite:', err);
        alert('Error finding user. Please try again.');
      }
    });
  }
} 