import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  error: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data.resources,
      error: err => this.error = 'Failed to load categories.'
    });
  }

  editCategory(category: Category): void {
    this.router.navigate(['/categories', category.id, 'edit']);
  }
}
