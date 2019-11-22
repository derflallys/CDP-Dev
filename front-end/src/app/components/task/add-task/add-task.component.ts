import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: []
})
export class AddTaskComponent implements OnInit {

  addTask: FormGroup;
  task: Task;
  issueIds: Number[];
  error = false;
  close = true;
  @Input() taskId = null;
  title = 'Ajouter une tâche';
  update = false;
  projectId = this.data.projectId;
  sprintId = this.data.sprintId;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    public dialogRefUpdate: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {projectId: null, sprintId: null},
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.addTask = this.formBuilder.group({
      issues: ['', Validators.required],
      dod: ['Il faudra ...', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.issueService.getIssueBySprint(this.sprintId).subscribe(issues => {
      const ids = [];
      issues.forEach(function(issue) {
        ids.push(issue.issueId)
      })
      this.issueIds = ids;
    });
    if (this.taskId) { this.loadTask(); }
  }

  onSubmit() {
    if (this.addTask.invalid) { return; }

    const issues = this.addTask.controls.issues.value[0];
    const dod = this.addTask.controls.dod.value;
    const startDate = this.addTask.controls.startDate.value;
    const endDate = this.addTask.controls.endDate.value;

    console.log('issues', issues)
    
    if (this.update) {
      const updateTask = new Task(null, this.projectId, this.sprintId, issues, dod, startDate, endDate);
      this.taskService.updateTask(updateTask, this.task._id).subscribe(
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
      const newTask = new Task(null, this.projectId, this.sprintId, issues, dod, startDate, endDate);
      console.log(newTask);
      console.log('Add');
      this.taskService.addTask(newTask).subscribe(
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

  private loadTask() {
    this.taskService.getTask(this.taskId).subscribe(
      res => {
        this.task = res;
        this.title = 'Modifier la tâche';
        this.addTask = this.formBuilder.group({
          issues: [this.task.issues, Validators.required],
          dod: [this.task.dod, Validators.required],
          startDate: [this.task.startDate, Validators.required],
          endDate: [this.task.endDate, Validators.required]
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
