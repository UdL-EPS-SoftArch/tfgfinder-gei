import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import {UserSearchComponent} from "../../user/user-search/user-search.component";

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  standalone: true,
  imports: [RouterLink, NgbPagination, NgForOf, CommonModule],
})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  page = 1;
  pageSize = 5;
  totalProposals = 0;

  constructor(
    public router: Router,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    // Load initial data
    this.loadProposals();

    // Subscribe to navigation events to refresh list
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/proposals') {
          this.loadProposals();
        }
      });
  }

  loadProposals(): void {
    this.proposalService
      .getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { title: 'ASC' } })
      .subscribe({
        next: (page: PagedResourceCollection<Proposal>) => {
          this.proposals = page.resources;
          this.totalProposals = page.totalElements;
        },
        error: (error) => {
          console.error('Error loading proposals:', error);
        }
      });
  }

  changePage(): void {
    this.loadProposals();
  }

  detail(proposal: Proposal): void {
    this.router.navigate(['proposals', proposal.id]);
  }
}
