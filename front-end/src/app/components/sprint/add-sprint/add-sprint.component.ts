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
  @Input() projectId = null;

  constructor(private formBuilder: FormBuilder, private sprintService: SprintService
  ,           private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.getListProject(projects));
    this.addSprint = this.formBuilder.group({
      title: ['Sprint', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });
  }

  getListProject(projets) {
    this.projects = projets;
  }
  onSubmit() {
    if (this.addSprint.invalid) { return; }
    const title = this.addSprint.controls.title.value;
    const Sdate = this.addSprint.controls.startDate.value;
    const Edate = this.addSprint.controls.endDate.value;
    if (!this.projectId ) {
      this.projectId = '5dbf51c7cb6d97659ce04a2b';
    }
    const newSprint = new Sprint(null, this.projectId , title, Sdate, Edate);
    console.log(newSprint);
    this.sprintService.addSprint(newSprint).subscribe(res => {
      console.log(res);
    });
  }
}
