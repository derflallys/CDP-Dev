import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sprint} from '../../../models/sprint';
import {SprintService} from '../../../services/sprint.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UpdateSprintComponent} from '../update-sprint/update-sprint.component';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css']
})
export class AddSprintComponent implements OnInit {

  addSprint: FormGroup;
  sprint: Sprint;
  title = 'Ajouter un sprint';
  update = false;
  @Input() sprintId = null;
  projectId = null;
  error = false;
  states = [
    'To Start', 'In progress', 'Completed'
  ];
  URL_REGEX = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})\/?([\w .-]*)*(\.git)$/g;
  sprintRealese: false;


  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    public dialogRef: MatDialogRef<AddSprintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {projectId: null, finishSprint: null},
    public dialogRefUpdate: MatDialogRef<UpdateSprintComponent>,
  ) {
    this.projectId = this.data.projectId;
    this.sprintRealese = this.data.finishSprint;
  }

  ngOnInit() {
    this.addSprint = this.formBuilder.group({
      title: ['Sprint', Validators.required],
      startDate: [new Date().toString, Validators.required],
      endDate: [new Date().toString, Validators.required],
      release: [{value: '', disabled: !this.sprintRealese} ],
      state: [{value: 'To Start', disabled: true}, Validators.required],
    });
    if (this.sprintId) {
      this.loadSprint();
    }
  }

  onSubmit() {
    if (this.addSprint.invalid) { return; }
    const title = this.addSprint.controls.title.value;
    const Sdate = this.addSprint.controls.startDate.value;
    const Edate = this.addSprint.controls.endDate.value;
    const state = this.addSprint.controls.state.value;
    const release = this.addSprint.controls.release.value;
    if (this.update) {
      const updateSprint = new Sprint(this.sprint._id, this.sprint.sprintId, this.sprint.projectId, title, Sdate, Edate, state, release);
      this.sprintService.updateSprint(updateSprint, this.sprint._id).subscribe(
        res => {
          console.log(res);
          console.log('Update');
          this.dialogRefUpdate.close(this.error);
        },
        error => {
          this.error = true;
          this.dialogRefUpdate.close(this.error);
          console.log(error);
        }
      );
    } else {
      const newSprint = new Sprint(null, null, this.projectId , title, Sdate, Edate, state, null);
      console.log(newSprint);
      this.sprintService.addSprint(newSprint).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(this.error);
        },
        error => {
          this.error = true;
          this.dialogRef.close(this.error);
          console.log(error);
        }
      );
    }
  }

  private loadSprint() {
    this.sprintService.getSprint(this.sprintId).subscribe(
      sprint => {
        this.sprint = sprint;
        this.title = 'Modifier le sprint ' + sprint.sprintId;
        this.addSprint = this.formBuilder.group({
          title: [this.sprint.title, Validators.required],
          startDate: [this.sprint.startDate, Validators.required],
          endDate: [this.sprint.endDate, Validators.required],
          release: [{value: this.sprint.release, disabled: !this.sprintRealese} ],
          state: [{value: this.sprint.state, disabled: true}, Validators.required]


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
