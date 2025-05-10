import { Component } from '@angular/core';

@Component({
  selector: 'app-interest-list',
  templateUrl: './interest-list.component.html',
  standalone: false // remove this if you added it
})
export class InterestListComponent {
  proposals = [
    {id: 1, title: 'AI in Education'},
    {id: 2, title: 'Web Accessibility Tool'},
    {id: 3, title: 'Smart Recycling System'}
  ];

  interestedProposalIds: number[] = [];
  acceptedProposalIds: number[] = [];
  rejectedProposalIds: number[] = [];

  showInterest(proposalId: number): void {
    console.log('Show Interest:', proposalId);
    this.interestedProposalIds.push(proposalId);
  }

  isInterested(id: number): boolean {
    return this.interestedProposalIds.includes(id)
  }

  acceptInterest(proposalId: number): void {
    console.log('Accepted:', proposalId);
    this.acceptedProposalIds.push(proposalId);
  }

  rejectInterest(proposalId: number): void {
    console.log('Rejected:', proposalId);
    this.rejectedProposalIds.push(proposalId);
  }
}
