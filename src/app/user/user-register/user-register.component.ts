import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';
<<<<<<< Updated upstream
=======
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-user-register',
  standalone: true,
<<<<<<< Updated upstream
  imports: [FormsModule],
=======
  imports: [FormsModule, CommonModule],
>>>>>>> Stashed changes
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
  public user: User = new User();

  constructor(
    private router: Router,
<<<<<<< Updated upstream
    private userService: UserService
  ) {}

  onSubmit(): void {
    this.userService.createResource({ body: this.user }).subscribe(
      () => this.router.navigate(['/users']),
      error => console.error('Failed to register user:', error)
    );
=======
    private userService: UserService,
    private location: Location,
    private authService: AuthenticationBasicService
  ) {}

  onSubmit(): void {
    this.userService.createResource({ body: this.user }).subscribe({
      next: () => {
        // Log the user in after registration
        this.authService.login(this.user.username, this.user.password).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (error) => console.error('Failed to log in after registration:', error)
        });
      },
      error: (error) => console.error('Failed to register user:', error)
    });
>>>>>>> Stashed changes
  }
}
