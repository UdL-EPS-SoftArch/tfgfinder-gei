import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'], 
  imports: [ FormsModule ]
})
export class UserRegisterComponent implements OnInit {
  public user: User;

  constructor(private router: Router,
              private location: Location,
              private userService: UserService,
              private authenticationBasicService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(): void {
    this.userService.createResource({ body: this.user }).subscribe(
      () => {
        this.authenticationBasicService.login(this.user.username, this.user.password).subscribe(
          (user: User) => this.router.navigate(['users', user.username]));
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
