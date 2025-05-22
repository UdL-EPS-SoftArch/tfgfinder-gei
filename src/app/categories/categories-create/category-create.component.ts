import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CategoryCreateComponent implements OnInit {
  public category: Category = new Category();
  public errorMessage: string | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.categoryService.createResource({ body: this.category }).subscribe({
      next: () => {
        this.router.navigate(['/categories'], { queryParams: { refresh: true } });
      },
      error: (error) => {
        this.errorMessage = 'Failed to create category. Please try again.';
        console.error('Failed to create category:', error);
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }
}
