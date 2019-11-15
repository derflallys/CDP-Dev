import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { MatDialogRef } from '@angular/material';
import { Sprint } from '../../../models/sprint';
import { SprintService } from '../../../services/sprint.service';

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
  error = false;
  URL_REGEX = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})\/?([\w .-]*)*(\.git)$/g;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public dialogRefUpdate: MatDialogRef<UpdateProjectComponent>,
    private projectService: ProjectService,
    private sprintService: SprintService
  ) { }

  ngOnInit() {
    this.addProject = this.formBuilder.group({
      title: ['', Validators.required],
      duration: [1, Validators.required],
      description: ['', Validators.required],
      repositoryURL: ['https://www.url.tld/repo.git', Validators.required],
      refspecifying: ['', Validators.required]
    });
    if (this.projectId) { this.loadProject(); }
  }

  onSubmit() {
    if (this.addProject.invalid) { return; }

    const title = this.addProject.controls.title.value;
    const users = []; // TMP
    const duration = Number(this.addProject.controls.duration.value);
    const description = this.addProject.controls.description.value;
    const repositoryURL = this.addProject.controls.repositoryURL.value;
    const refspecifying = this.addProject.controls.refspecifying.value;

    if (this.update) {
      const updateProject = new Project(this.projectId, title, users, duration, description, repositoryURL, refspecifying);
      this.projectService.updateProject(updateProject, this.project._id).subscribe(
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
      const newProject = new Project(null, title, users, duration, description, repositoryURL, refspecifying);
      console.log(newProject);
      this.projectService.addProject(newProject).subscribe(() => {
        this.projectService.getProjects().subscribe(projects => {
          const project = projects[projects.length - 1];
          // Create the first sprint of the project
          const endDate = new Date();
          const sprintDuration = 10;
          endDate.setDate(new Date(project.createdAt).getDate() + sprintDuration);
          const sprint0 = new Sprint(null, 0, project._id, 'Sprint 0', project.createdAt.toString(), endDate.toString());
          this.sprintService.addSprint(sprint0).subscribe(sprint => { console.log(sprint); });
          this.dialogRef.close(this.error);
        },
          error1 => {
            this.error = true;
            this.dialogRef.close(this.error);
            console.log(error1);
          }
        );
      });
    }
  }

  private loadProject() {
    this.projectService.getProject(this.projectId).subscribe(
      res => {
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
      error => { console.log(error); }
    );
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

}
