import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './category.service';
import { Category } from './category';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {
  category: Category = new Category();
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getResourceById(id).subscribe({
      next: data => this.category = data,
      error: () => this.error = 'Category not found.'
    });
  }

  onSubmit(): void {
    if (!this.category.name) {
      this.error = 'Name is required.';
      return;
    }
    this.categoryService.updateCategory(this.category).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: err => this.error = 'Failed to update category.'
    });
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
