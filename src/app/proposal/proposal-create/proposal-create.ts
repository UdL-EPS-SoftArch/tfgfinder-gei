import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html'
})
export class ProposalCreateComponent implements OnInit {
  public proposal: Proposal;
  public categoriesInput: string = ''; // Temporary variable for user input

  constructor(
    private router: Router,
    private location: Location,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.proposal = new Proposal();
  }

  onSubmit(): void {
    // Process categoriesInput into an array of numbers
    this.proposal = this.categoriesInput
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));

    this.proposalService.createResource({ body: this.proposal }).subscribe(
      () => this.router.navigate(['/proposals']),
      error => console.error('Failed to create proposal:', error)
    );
  }

  onCancel(): void {
    this.location.back();
  }
}
