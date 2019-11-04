import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sprint} from '../../../models/sprint';
import {SprintService} from '../../../services/sprint.service';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';


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
  @Input() projectId = null;
  @Input() sprintId = null;

  constructor(private formBuilder: FormBuilder, private sprintService: SprintService
  ,           private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.getListProject(projects));
    this.addSprint = this.formBuilder.group({
      title: ['Sprint', Validators.required],
      startDate: [new Date().toString, Validators.required],
      endDate: [new Date().toString, Validators.required]
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
    if (!this.projectId ) {
      this.projectId = '5dbf51c7cb6d97659ce04a2b';
    }
    if (this.update) {
      const updateSprint = new Sprint(this.sprint._id, this.sprint.sprintId, this.sprint.projectId , title, Sdate, Edate);
      this.sprintService.updateSprint(updateSprint, this.sprint._id).subscribe( res => {
        console.log(res);
        // TODO Ajouter notification
        console.log('Update');
      }
        ,
        error => {
          console.log(error);
        }
      );
    } else {
      const newSprint = new Sprint(null, null, this.projectId , title, Sdate, Edate);
      console.log(newSprint);
      this.sprintService.addSprint(newSprint).subscribe(res => {
        console.log(res);
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
        endDate: [this.sprint.endDate, Validators.required]
      });
      this.update = true;
    },
      error => {
      console.log(error);
      });
  }
}
