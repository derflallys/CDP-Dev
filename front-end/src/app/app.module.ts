import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddIssueComponent } from './components/issue/add-issue/add-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    AddIssueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
