import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../proposal.service';  // Adjust path as needed
import { Proposal } from '../proposal';              // Adjust path as needed

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html'
})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  page = 1;
  pageSize = 10;
  totalProposals = 0;

  constructor(private proposalService: ProposalService) {}

  ngOnInit(): void {
    this.fetchProposals();
  }

  fetchProposals(): void {
    this.proposalService.getPage(this.page - 1, this.pageSize).subscribe(response => {
      this.proposals = response.content; // assuming Spring-style paginated response
      this.totalProposals = response.totalElements;
    });
  }

  changePage(): void {
    this.fetchProposals();
  }

  detail(event: any): void {
    this.proposals = event.results;  // assuming event carries filtered proposals
    this.totalProposals = event.total || event.results.length;
  }
}
