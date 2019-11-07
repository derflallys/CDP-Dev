import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sprint} from '../../../models/sprint';
import {SprintService} from '../../../services/sprint.service';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UpdateIssueComponent} from '../../issue/update-issue/update-issue.component';
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
   projects: Project[] = [];
   update = false;
  @Input() sprintId = null;
  projectId = null;
  states = [
    'To Start', 'In progress', 'Completed'
  ];

  constructor(private formBuilder: FormBuilder, private sprintService: SprintService,
              public dialogRef: MatDialogRef<AddSprintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {projectId: null},
              public dialogRefUpdate: MatDialogRef<UpdateSprintComponent>,
              private projectService: ProjectService) {
    this.projectId = this.data.projectId;
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.getListProject(projects));
    this.addSprint = this.formBuilder.group({
      title: ['Sprint', Validators.required],
      startDate: [new Date().toString, Validators.required],
      endDate: [new Date().toString, Validators.required],
      state: ['To Start', Validators.required]
    });
    if (this.sprintId) {
      this.loadSprint();
    }
  }

  getListProject(projets) {
    this.projects = projets;
  }
  // TODO Mettre le format DD-MM-YYYY pour les dates voir solution back ou front
  onSubmit() {
    if (this.addSprint.invalid) { return; }
    const title = this.addSprint.controls.title.value;
    const Sdate = this.addSprint.controls.startDate.value;
    const Edate = this.addSprint.controls.endDate.value;
    const state = this.addSprint.controls.state.value;
    if (!this.projectId ) {
      this.projectId = '5dbf51c7cb6d97659ce04a2b';
    }
    if (this.update) {
      const updateSprint = new Sprint(this.sprint._id, this.sprint.sprintId, this.sprint.projectId , title, Sdate, Edate, state);
      this.sprintService.updateSprint(updateSprint, this.sprint._id).subscribe( res => {
        console.log(res);
        console.log('Update');
        this.dialogRefUpdate.close();
      }
        ,
        error => {
          console.log(error);
        }
      );
    } else {
      const newSprint = new Sprint(null, null, this.projectId , title, Sdate, Edate, state);
      console.log(newSprint);
      this.sprintService.addSprint(newSprint).subscribe(res => {
        console.log(res);
        this.dialogRef.close();
      });
    }

  }

  private loadSprint() {
    this.sprintService.getSprint(this.sprintId).subscribe(sprint => {
      this.sprint = sprint;
      this.title = 'Modifier le sprint';
      this.addSprint = this.formBuilder.group({
        title: [this.sprint.title, Validators.required],
        startDate: [this.sprint.startDate, Validators.required],
        endDate: [this.sprint.endDate, Validators.required],
        state: [this.sprint.state, Validators.required]
      });
      this.update = true;
    },
      error => {
      console.log(error);
      });
  }
}
