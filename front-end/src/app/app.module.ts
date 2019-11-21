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
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatBadgeModule,
  MatTooltipModule,
  MatListModule,
  MatCheckboxModule,
  MatChipsModule
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
import { UpdateSprintComponent } from './components/sprint/update-sprint/update-sprint.component';
import { DeleteDialogComponent } from './components/utils/delete-dialog/delete-dialog.component';
import { UpdateProjectComponent } from './components/project/update-project/update-project.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { AddUserComponent } from './components/project/add-user/add-user.component';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  exports: [
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSortModule,
    MatCheckboxModule
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
    ProjectOverviewComponent,
    UpdateSprintComponent,
    DeleteDialogComponent,
    AddTaskComponent,
    SignupComponent,
    SigninComponent,
    UpdateProjectComponent,
    UpdateTaskComponent,
    AddUserComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    MatBadgeModule,
    MatTooltipModule,
    MatListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return sessionStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/login']
      }
    }),
    MatChipsModule
  ],
  entryComponents: [
    DeleteDialogComponent,
    AddSprintComponent,
    AddIssueComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    UpdateSprintComponent,
    UpdateIssueComponent,
    UpdateProjectComponent,
    UpdateTaskComponent
  ],
  providers: [ AuthGuardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
