import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ProposalCreateComponent implements OnInit {
  public proposal: Proposal;
  public categoriesInput: string = '';
  public errorMessage: string | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.proposal = new Proposal();
  }

  onSubmit(): void {
    this.proposal.categories = this.categoriesInput
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));

    this.proposalService.createResource({ body: this.proposal }).subscribe({
      next: () => {
        this.router.navigate(['/proposals'], { queryParams: { refresh: true } }); // Add query param to force refresh
      },
      error: (error) => {
        this.errorMessage = 'Failed to create proposal. Please try again.';
        console.error('Failed to create proposal:', error);
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }
}
