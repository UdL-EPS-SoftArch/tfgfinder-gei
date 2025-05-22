import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { User } from '../../login-basic/user';

@Component({
  selector: 'app-proposal-list',
  standalone: true,
  imports: [NgForOf, CommonModule, NgbPagination],
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  page = 1;
  pageSize = 5;
  totalProposals = 0;

  constructor(
    private router: Router,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.loadProposals();

    
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
      .getPage({
        pageParams: { page: this.page - 1, size: this.pageSize },
        sort: { title: 'ASC' }
      })
      .subscribe({
        next: (page: PagedResourceCollection<Proposal>) => {
          this.proposals = page.resources;
          this.totalProposals = page.totalElements;

          this.proposals.forEach(proposal => {
            if (proposal.hasRelation('owner')) {
              proposal
                .getRelation<User>('owner')
                .subscribe(ownerUser => {
                  proposal.owner = ownerUser;
                });
            }
          });
        },
        error: err => console.error('Error loading proposals:', err)
      });
  }

  changePage(): void {
    this.loadProposals();
  }
}
