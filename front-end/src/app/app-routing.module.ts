import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import {AddSprintComponent} from './components/sprint/add-sprint/add-sprint.component';
import {AddIssueComponent} from './components/issue/add-issue/add-issue.component';
import {UpdateIssueComponent} from './components/issue/update-issue/update-issue.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'addsprint', component: AddSprintComponent },
  { path: 'updateissue/:id', component: UpdateIssueComponent },
  { path: 'addissue', component: AddIssueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
