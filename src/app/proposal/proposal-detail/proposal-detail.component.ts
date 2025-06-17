import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css'],
  standalone: true,
  imports: [CommonModule], // Add necessary imports
})
export class ProposalDetailComponent implements OnInit {
  public proposal: Proposal | null = null;
  public errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) { // Validate ID
      this.proposalService.getResource(id).subscribe({
        next: (proposal) => {
          this.proposal = proposal;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load proposal. Please try again later.';
          console.error('Error fetching proposal:', error);
        }
      });
    } else {
      this.errorMessage = 'Invalid proposal ID.';
      this.router.navigate(['/proposals']); // Redirect to list if ID is invalid
    }
  }
}
