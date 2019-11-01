import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: []
})
export class AddProjectComponent implements OnInit {

  addProject: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

  title = 'Créer un projet';

  ngOnInit() {
    this.addProject = this.formBuilder.group({
      title: ['', Validators.required],
      duration: [1, Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      refspecifying: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addProject.invalid) { return; }
    const title = this.addProject.controls.title.value;
    const duration = this.addProject.controls.duration.value;
    const description = this.addProject.controls.description.value;
    const url = this.addProject.controls.url.value;
    const refspecifying = "tmpNull"; // this.addProject.controls.refspecifying.value;
    const newProject  = new Project(title, duration, description, url, refspecifying);
    console.log(newProject);
    this.projectService.addProject(newProject).subscribe(res => {
      console.log(res);
    });
  }
}
