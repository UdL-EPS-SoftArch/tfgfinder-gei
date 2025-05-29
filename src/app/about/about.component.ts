import {Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor() { }

}
