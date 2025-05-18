import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
  public user: User = new User();
  public submitted = false; // NEW: track form submission

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationBasicService
  ) {}

  onSubmit(userForm: NgForm): void {
    this.submitted = true; // NEW: mark form as submitted
    if (userForm.invalid) {
      userForm.control.markAllAsTouched(); // show all validation messages
      return;
    }
    this.userService.createResource({ body: this.user }).subscribe({
      next: () => {
        this.authService.login(this.user.username, this.user.password).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (error) => console.error('Failed to log in after registration:', error)
        });
      },
      error: (error) => console.error('Failed to register user:', error)
    });
  }
}
