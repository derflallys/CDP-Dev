import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectListComponent} from './components/project/project-list/project-list.component';
import {ProjectOverviewComponent} from './components/project/project-overview/project-overview.component';
import {SignupComponent} from './components/user/signup/signup.component';
import {SigninComponent} from './components/user/signin/signin.component';
import {AuthGuardService} from './services/auth-guard.service';
import {HomeComponent} from './components/home/home.component';
import {SprintKanbanComponent} from './components/sprint/sprint-kanban/sprint-kanban.component';
import {SprintOverviewComponent} from './components/sprint/sprint-overview/sprint-overview.component';
import {UsersProjectComponent} from './components/user/users-project/users-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuardService] },
  { path: 'project/:id', component: ProjectOverviewComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'kanban/:id', component: SprintKanbanComponent, canActivate: [AuthGuardService] },
  { path: 'sprint/:id', component: SprintOverviewComponent, canActivate: [AuthGuardService] },
  { path: 'users/:id', component: UsersProjectComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
