import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './components/project-list/project-list.component';
import {AddSprintComponent} from './components/sprint/add-sprint/add-sprint.component';
import {AddIssueComponent} from "./components/issue/add-issue/add-issue.component";

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'addsprint', component: AddSprintComponent },
  { path: 'addissue', component: AddIssueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
