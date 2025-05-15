import { Component, OnInit } from '@angular/core';
import { InterestService } from '../interest.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-interests',
  templateUrl: './show-interests.component.html',
  styleUrls: ['./show-interests.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ShowInterestsComponent implements OnInit {
  interests: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private interestService: InterestService,
    private authService: AuthenticationBasicService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchInterests();
  }

  private extractId(href: string): string {
    return href.split('/').pop() || '';
  }

  private fetchInterests(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.setError('No user logged in');
      return;
    }

    this.interestService.getAllInterests().subscribe({
      next: ({ _embedded }) => {
        const interests = _embedded?.interests || [];
        if (!interests.length) return this.finishLoading([]);

        const result: any[] = [];
        let pending = interests.length;

        interests.forEach(interest => {
          this.http.get<any>(interest._links.what.href).subscribe({
            next: proposal => {
              this.http.get<any>(proposal._links.owner.href).subscribe({
                next: owner => {
                  this.http.get<any>(interest._links.who.href).subscribe({
                    next: submitter => {
                      if (owner.username === user.username) {
                        result.push({
                          ...interest,
                          what: proposal,
                          who: submitter,
                          id: this.extractId(interest._links.self.href)
                        });
                      }
                      if (!--pending) this.finishLoading(result);
                    },
                    error: () => this.handleNestedError(--pending, result)
                  });
                },
                error: () => this.handleNestedError(--pending, result)
              });
            },
            error: () => this.handleNestedError(--pending, result)
          });
        });
      },
      error: () => this.setError('Failed to load interests')
    });
  }

  private finishLoading(data: any[]) {
    this.interests = data;
    this.loading = false;
  }

  private setError(msg: string) {
    this.error = msg;
    this.loading = false;
  }

  private handleNestedError(pending: number, result: any[]) {
    if (!pending) this.finishLoading(result);
  }

  accept(interest: any): void {
    this.updateInterestStatus(interest, 'ACCEPTED', () =>
      this.interestService.acceptInterest(this.extractId(interest._links.self.href))
    );
  }

  reject(interest: any): void {
    this.updateInterestStatus(interest, 'REJECTED', () =>
      this.interestService.rejectInterest(this.extractId(interest._links.self.href))
    );
  }

  private updateInterestStatus(interest: any, status: string, requestFn: () => any) {
    const id = this.extractId(interest._links.self.href);
    if (!id) return this.setError('Invalid interest ID');

    const prevStatus = interest.status;
    interest.status = status;

    requestFn().subscribe({
      error: () => {
        interest.status = prevStatus;
        this.setError(`Failed to ${status.toLowerCase()} interest`);
      }
    });
  }
}
