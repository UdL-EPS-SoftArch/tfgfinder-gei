import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { CategoryService } from '../../categories/category.service';
import { Proposal } from '../proposal';
import { Category } from '../../categories/category';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ProposalCreateComponent implements OnInit {
  public proposal: Proposal = new Proposal();
  public categories: Array<Category> = new Array<Category>();  // List to hold categories
  public selectedCategory: number | null = null;  // Single selected category ID (degree)
  public errorMessage: string | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private proposalService: ProposalService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Fetch categories (degrees) on component initialization
    this.categoryService.getPage({pageParams:{page:0,size:1000000}}).subscribe({
      next: (categories) => {
        this.categories = categories.resources;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch categories.';
        console.error('Failed to fetch categories:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.selectedCategory) {
      // Set the selected category as the category for the proposal
      this.proposal.categories = [this.selectedCategory];
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
  }

  onCancel(): void {
    this.location.back();
  }
}
