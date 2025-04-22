import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <div class="jumbotron text-center">
      <h1>404 Not Found</h1>
      <p>You may be lost. Back <a routerLink="/">home</a>.</p>
    </div>
  `
})
export class NotFoundComponent {}
