import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: []
})
export class AddProjectComponent implements OnInit {

  title = 'Créer un projet';

  addProject: FormGroup;

  project: Project;

  @Input() projectId = null;
  
  update = false;

  URL_REGEX = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})\/?([\w .-]*)*(\.git)$/g;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public dialogRefUpdate: MatDialogRef<UpdateProjectComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.addProject = this.formBuilder.group({
      title: ['', Validators.required],
      duration: [1, Validators.required],
      description: ['', Validators.required],
      url: ['https://www.url.tld/repo.git', Validators.required],
      refspecifying: ['', Validators.required]
    });
    if (this.projectId) { this.loadProject(); }
  }

  onSubmit() {
    if (this.addProject.invalid) { return; }

    const title = this.addProject.controls.title.value;
    const duration = Number(this.addProject.controls.duration.value);
    const description = this.addProject.controls.description.value;
    const url = this.addProject.controls.url.value;
    const refspecifying = this.addProject.controls.refspecifying.value;

    if (this.update) {
      const updateProject = new Project(this.projectId, title, duration, description, url, refspecifying);
      this.projectService.updateProject(updateProject, this.project._id).subscribe( res => {
        console.log(res);
        console.log('Update');
        this.dialogRefUpdate.close();
      },
        error => {
          console.log(error);
        }
      );
    } else {
      const newProject = new Project(null, title, duration, description, url, refspecifying);
      console.log(newProject);
      this.projectService.addProject(newProject).subscribe(res => {
        console.log(res);
        this.dialogRef.close();
      });
    }
  }

  private loadProject() {
    this.projectService.getProject(this.projectId).subscribe(res => {
      this.project = res;
      this.title = 'Modifier le projet';
      this.addProject = this.formBuilder.group({
        title: [this.project.title, Validators.required],
        duration: [this.project.duration, Validators.required],
        description: [this.project.description, Validators.required],
        repositoryURL: [this.project.repositoryURL, Validators.required],
        refspecifying: [this.project.refspecifying, Validators.required],
      });
      this.update = true;
    },
      error => {
        console.log(error);
      }
    );
  }

}
