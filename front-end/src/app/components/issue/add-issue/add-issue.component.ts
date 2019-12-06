import { Component, Inject, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../../../models/issue';
import { IssueService } from '../../../services/issue.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateIssueComponent } from '../update-issue/update-issue.component';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css'],
  providers: []
})
export class AddIssueComponent implements OnInit {

  addIssue: FormGroup;
  issue: Issue;
  error = false;
  close = true;
  @Input() issueId = null;
  @Input() role = null;
  title = 'Ajouter une issue';
  update = false;
  projectId = this.data.projectId;
  priorities = [
    'HIGH', 'MEDIUM', 'LOW'
  ];
  states = [
    'TODO', 'DOING', 'DONE'
  ];
  roleUser ;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<AddIssueComponent>,
    public dialogRefUpdate: MatDialogRef<UpdateIssueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {projectId: null, role: null},
    private issueService: IssueService
  ) {
    this.roleUser = this.data.role;
  }

  ngOnInit() {
    this.roleUser = this.role;
    this.addIssue =  this.formBuilder.group({
      description: [{value: 'En tant que', disabled: this.roleUser === 'PO'}, Validators.required],
      note: [''],
      state: [ {value: 'TODO', disabled: true }, Validators.required],
      difficulty: [ {value: 1,  disabled: this.roleUser === 'PO'}, Validators.required],
      priority: ['LOW', Validators.required]
    });
    if (this.issueId) {
      this.loadIssue();
    }
  }

  onSubmit() {
    if (this.addIssue.invalid) {
      return;
    }
    const description = this.addIssue.controls.description.value;
    const note = this.addIssue.controls.note.value;
    const state = this.addIssue.controls.state.value;
    const difficulty = Number(this.addIssue.controls.difficulty.value);
    const priority = this.addIssue.controls.priority.value;
    if (this.update) {
 const updateIssue = new Issue(this.issue.projectId, this.issue._id, description, note, state, priority, difficulty, this.issue.sprintId);
 this.issueService.updateIssue(updateIssue, this.issue._id).subscribe(
        res => {
          console.log(res);
          console.log('Update');
          this.dialogRefUpdate.close(this.error);
          this.ngZone.run(() => this.router.navigate(['project/' + this.issue.projectId]));
        },
        error => {
          this.error = true;
          this.dialogRefUpdate.close(this.error);
          console.log(error);
        }
      );
    } else {
      const newIssue = new Issue(this.projectId, null, description, note, state, priority, difficulty);
      console.log(newIssue);
      console.log('Add');
      this.issueService.addIssue(newIssue).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(this.error);
          this.ngZone.run(() => this.router.navigate(['project/' + this.projectId]));
        },
        error => {
          this.error = true;
          this.dialogRef.close(this.error);
          console.log(error);
        }
      );
    }
  }

  private loadIssue() {
    this.issueService.getIssue(this.issueId).subscribe(
      res => {
        this.issue = res;
        this.title = 'Modifier l\'issue';
        this.addIssue = this.formBuilder.group({
          description: [{value: this.issue.description, disabled: this.roleUser === 'PO'}, Validators.required],
          state: [{value: this.issue.state, disabled: true }, Validators.required],
          difficulty: [{value: this.issue.difficulty, disabled: this.roleUser === 'PO' }, Validators.required],
          priority: [this.issue.priority, Validators.required],
          note: [this.issue.note]
        });
        this.update = true;
      },
      error => { console.log(error); }
    );
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

}
