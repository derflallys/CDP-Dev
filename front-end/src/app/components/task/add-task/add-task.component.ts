import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models/task';
import { User } from '../../../models/user';
import { TaskService } from '../../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: []
})
export class AddTaskComponent implements OnInit {

  addTask: FormGroup;
  task: Task;
  error = false;
  close = true;
  @Input() taskId = null;
  title = 'Ajouter une tâche';
  update = false;
  devs: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    public dialogRefUpdate: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {sprintId: null},
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.addTask = this.formBuilder.group({
      issues: ['x, y', Validators.required],
      dev: ['', Validators.required],
      dod: ['Il faudra ...', Validators.required],
      state: ['TODO', Validators.required],
      toTest: ['', Validators.required],
      toDoc: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    if (this.taskId) { this.loadTask(); }
  }

  onSubmit() {
    if (this.addTask.invalid) { return; }

    const issues = this.addTask.controls.issues.value;
    const dev = this.addTask.controls.dev.value;
    const dod = this.addTask.controls.dod.value;
    const state = this.addTask.controls.state.value;
    const toTest = this.addTask.controls.toTest.value;
    const toDoc = this.addTask.controls.toDoc.value;
    const startDate = this.addTask.controls.startDate.value;
    const endDate = this.addTask.controls.endDate.value;
    
    if (this.update) {
      const updateTask = new Task(null, issues, dev, null, dod, state, toTest, toDoc, startDate, endDate);
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
      const newTask = new Task(null, issues, dev, null, dod, state, toTest, toDoc, startDate, endDate);
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
          dev: [this.task.dev, Validators.required],
          dod: [this.task.dod, Validators.required],
          state: [this.task.state, Validators.required],
          toTest: [this.task.toTest, Validators.required],
          toDoc: [this.task.toDoc, Validators.required],
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
