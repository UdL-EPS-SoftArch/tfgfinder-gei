import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent {
  category: Category = new Category ();
  error: string | null = null;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  onSubmit(): void {
    if (!this.category.name) {
      this.error = 'Name is required.';
      return;
    }
    this.categoryService.createCategory(this.category).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: () => this.error = 'Failed to create category.'
    });
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
