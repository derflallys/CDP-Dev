import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddSprintComponent } from './components/sprint/add-sprint/add-sprint.component';
import { AddIssueComponent } from './components/issue/add-issue/add-issue.component';
import { UpdateIssueComponent } from './components/issue/update-issue/update-issue.component';
import { ProjectOverviewComponent } from './components/project/project-overview/project-overview.component';
import {UpdateSprintComponent} from './components/sprint/update-sprint/update-sprint.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectOverviewComponent },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'addsprint', component: AddSprintComponent },
  { path: 'updateissue/:id', component: UpdateIssueComponent },
  { path: 'updatesprint/:id', component: UpdateSprintComponent },
  { path: 'addissue', component: AddIssueComponent },
  { path: 'listProject', component: ProjectListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
