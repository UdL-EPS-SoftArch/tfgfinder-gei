import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import { Location, NgIf } from '@angular/common';
import {User} from './user';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, NgIf],
    selector: 'app-login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationBasicService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(): void {
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(() => this.router.navigateByUrl(''));
  }

  onCancel(): void {
    this.location.back();
  }
}
