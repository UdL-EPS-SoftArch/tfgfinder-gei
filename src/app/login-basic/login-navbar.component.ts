import {Component} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {User} from './user';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  imports: [RouterModule, NgIf],
    selector: 'app-login-navbar,[app-login-navbar]',
    templateUrl: './login-navbar.component.html',
    styleUrls: ['./login-navbar.component.css'],
})
export class LoginNavbarComponent {

  constructor(private authenticationService: AuthenticationBasicService, private router: Router) {}

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  logout(event): void {
    event.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
