import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorMessageService} from './error-message.service';

@NgModule({
  imports: [CommonModule, NgbAlertModule],
  providers: [ErrorMessageService, provideHttpClient(withInterceptorsFromDi())]
})
export class ErrorHandlerModule {
}
