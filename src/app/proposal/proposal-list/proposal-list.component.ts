import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../proposal.service';  // Adjust path as needed
import { Proposal } from '../proposal';
import { Router, RouterLink } from '@angular/router';
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {UserSearchComponent} from "../../user/user-search/user-search.component";
import {NgForOf} from "@angular/common";            // Adjust path as needed

@Component({
  imports: [RouterLink, NgbPagination, NgForOf],
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html'
})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  page = 1;
  pageSize = 5;
  totalProposals = 0;

  constructor(
    public router: Router,
    private proposalService: ProposalService) {

  }

  ngOnInit(): void {
    this.proposalService.getPage({ pageParams:  { size: this.pageSize }, sort: { proposal: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Proposal>) => {
        this.proposals = page.resources;
        this.totalProposals = page.totalElements;
      });
  }

  changePage(): void {
    this.proposalService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { proposal: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Proposal>) => this.proposals = page.resources);
  }

  detail(proposal: Proposal): void {
    this.router.navigate(['proposals', proposal.id]);
  }
}
