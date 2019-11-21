import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUser: FormGroup;
  project: Project = this.data.project;
  error = false;
  title = 'Ajouter un utilisateur';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: null },
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.addUser =  this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addUser.invalid) { return; }
    const username = this.addUser.controls.username.value;
    this.projectService.addUserOnProject(this.project, this.project._id, username).subscribe(
      () => {
        this.dialogRef.close(this.error);
        this.ngZone.run(() => this.router.navigate(['project/' + this.project._id]));
      }, () => {
        this.error = true;
        this.dialogRef.close(this.error);
      }
    )
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

}
