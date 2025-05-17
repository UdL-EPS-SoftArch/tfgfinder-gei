import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule
})
export class UserRegisterComponent implements OnInit {
  public user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.userService.createResource({ body: this.user }).subscribe(
      () => this.router.navigate(['/login']),
      error => console.error('Failed to register user:', error)
    );
  }

  onCancel(): void {
    this.location.back();
  }
}
