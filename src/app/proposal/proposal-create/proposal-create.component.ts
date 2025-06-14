import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    private proposalService: ProposalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.proposal = new Proposal();
  }

  onSubmit(): void {
    const categoryNames = this.categoriesInput
      .split(',')
      .map(name => name.trim())
      .filter(name => !!name);

    const categoryRequests = categoryNames.map(name =>
      this.http.get<any>(`/categories/search/findByName?name=${name}`).toPromise()
    );

    Promise.all(categoryRequests)
      .then(responses => {
        this.proposal.categories = responses.map(res => res._links.self.href);

        if (this.proposal.owner) {
          this.proposal.owner = `/users/${this.proposal.owner}`;
        }
        if (this.proposal.student) {
          this.proposal.student = `/students/${this.proposal.student}`;
        }
        if (this.proposal.director) {
          this.proposal.director = `/professors/${this.proposal.director}`;
        }
        if (this.proposal.codirector) {
          this.proposal.codirector = `/directors/${this.proposal.codirector}`;
        }

        this.proposalService.createResource({ body: this.proposal }).subscribe({
          next: () => {
            this.router.navigate(['/proposals'], { queryParams: { refresh: true } });
          },
          error: (error) => {
            this.errorMessage = 'Failed to create proposal. Please try again.';
            console.error('Failed to create proposal:', error);
          }
        });
      })
      .catch(err => {
        this.errorMessage = 'One or more category names could not be resolved.';
        console.error('Category resolution error:', err);
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
