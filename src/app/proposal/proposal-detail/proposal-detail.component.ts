import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html'
})
export class ProposalDetailComponent implements OnInit {
  public proposal: Proposal = new Proposal();

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.proposalService.getResource(id).subscribe(
      proposal => {
        this.proposal = proposal;
      }
    );
  }
}
