import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddIssueComponent } from './components/issue/add-issue/add-issue.component';
import { UpdateIssueComponent } from './components/issue/update-issue/update-issue.component';
import { AddSprintComponent } from './components/sprint/add-sprint/add-sprint.component';
import { ProjectOverviewComponent } from './components/project/project-overview/project-overview.component';

@NgModule({
  exports: [
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  imports: [],
  declarations: []
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    AddIssueComponent,
    UpdateIssueComponent,
    AddSprintComponent,
    AddProjectComponent,
    ProjectOverviewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
