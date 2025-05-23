import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { ProposalListComponent } from "./proposal/proposal-list/proposal-list.component";
import { ProposalDetailComponent } from "./proposal/proposal-detail/proposal-detail.component";
import { ProposalCreateComponent } from "./proposal/proposal-create/proposal-create.component";
import { ShowInterestsComponent } from "./interest/show-interests/show-interests.component";
import { ChatListComponent } from "./chats/chat-list/chat-list.component";
import { ChatDetailComponent } from "./chats/chat-detail/chat-detail.component";
import { AboutnavComponent } from '../app/aboutnav/aboutnav.component';

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'proposals', component: ProposalListComponent },
  { path: 'proposals/create', component: ProposalCreateComponent, canActivate: [LoggedInGuard] }, // Specific route first
  { path: 'proposals/:id', component: ProposalDetailComponent },
  { path: 'interests', component: ShowInterestsComponent, canActivate: [LoggedInGuard]},
  { path: 'proposals', component: ProposalListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'aboutnav', component: AboutnavComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'chats', component: ChatListComponent },
  { path: 'chats/:id', component: ChatDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
