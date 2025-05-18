import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
  public user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit(): void {
    this.userService.createResource({ body: this.user }).subscribe(
      () => this.router.navigate(['/users']),
      error => console.error('Failed to register user:', error)
    );
  }
}
