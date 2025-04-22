import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorAlertComponent } from './error-handler/error-alert/error-alert.component';
import { RouterOutlet } from '@angular/router';

@Component({
    imports: [ NavbarComponent, ErrorAlertComponent, RouterOutlet],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TFG Finder GEI';
}
