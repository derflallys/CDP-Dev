import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AuthenticationService} from '../../../services/authentication.service';
import {SprintService} from '../../../services/sprint.service';
import {Sprint} from '../../../models/sprint';
import { Location } from '@angular/common';
import {DeleteDialogComponent} from '../../utils/delete-dialog/delete-dialog.component';
import { StepTaskComponent } from '../../task/step-task/step-task.component';

@Component({
  selector: 'app-sprint-kanban',
  templateUrl: './sprint-kanban.component.html',
  styleUrls: ['./sprint-kanban.component.css']
})
export class SprintKanbanComponent implements OnInit {
  taskTodo: Task[] = [];
  taskEncours: Task[] = [];
  taskEnTermine: Task[] = [];
  allTasks: Task[] = [];
  sprintId: string;
  sprint: Sprint ;
  configSnackBar = new MatSnackBarConfig();
  constructor(private taskService: TaskService, private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private sprintService: SprintService, private location: Location,
              public dialog: MatDialog,
              private  router: Router, public snackBar: MatSnackBar) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('id');
    this.sprintService.getSprint(this.sprintId).subscribe( res => {
      this.sprint = res;
    });
    this.refreshTasks();
  }

  openStepTask() {
    this.dialog.open(StepTaskComponent, { width: '800px', data: { tasks: this.allTasks } })
  }

  handleTasksBySprint(tasks) {
      if (tasks.length <= 0) {
        this.snackBar.open('❌ Ajouter des tâches avant de démarrer un sprint  !', 'Fermer', this.configSnackBar);

        this.location.back();
      }
      this.allTasks = tasks;
      this.taskTodo = tasks.filter(task => task.state === 'TODO');
      this.taskEncours = tasks.filter(task => task.state === 'DOING');
      this.taskEnTermine = tasks.filter(task => task.state === 'DONE');
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.data);
      console.log(event.container.id);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let message = ' ';
      const task = event.container.data[event.currentIndex];
      task.dev = this.authenticationService.getIdUser();

      if (event.container.id === 'cours') {
        task.state = 'DOING';
        task.toTest = false;
        task.toDoc = false;
        message = '✅ Cette tâche vous a été affecté !';
      }
      if (event.container.id === 'todo') {
        task.state = 'TODO';
        task.dev = null;
        task.toTest = false;
        task.toDoc = false;
        message = '✅ Cette tâche vous n\'est plus affecté !';
      }

      this.taskService.updateTask(task, task._id).subscribe(res => {
          console.log(res);
          if (message) {
            this.snackBar.open(message, 'Fermer', this.configSnackBar);
          }
          this.refreshTasks();
        },
        error => {
          console.log(error);
          this.snackBar.open('❌ Erreur lors de l\'affection de la tâche  !', 'Fermer', this.configSnackBar);

        }
      );
      if (event.container.id === 'finish') {
        this.taskTest(task);
        this.taskDoc(task);
        task.state = 'DONE';
        message = '';
      }

    }
  }

  evenPredicate(item: CdkDrag<Task>, te: CdkDropList) {
    console.log(te);
    console.log(item);
    return item.data.dev === this.authenticationService.getIdUser();
  }

  noReturnPredicate() {
    return false;
  }

  refreshTasks() {
    this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
        this.handleTasksBySprint(tasks);
      },
      error => {
        console.log(error);
        this.snackBar.open('❌ Veuillez vous connecter  !', 'Fermer', this.configSnackBar);

        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  getNameUser(idUser) {
    if (this.authenticationService.getIdUser() === idUser) {
      return this.authenticationService.getUsername();
    }
  }

  taskTest(task: Task) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    title: ' Tests  Tâche ' + task.taskId,
    content: 'Tests Effectués pour cette tâche ? '
  };
  const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
  dialogRefDelete.afterClosed().subscribe(result => {
    if (result === true) {
      task.toTest = true;
    }
    this.taskService.updateTask(task, task._id).subscribe(res => {
        console.log(res);
        this.refreshTasks();
      },
      error => {
        console.log(error);
        this.snackBar.open('❌ Erreur lors de l\'affection de la tâche  !', 'Fermer', this.configSnackBar);

      }
    );
    });

  }
  taskDoc(task: Task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: ' Documentation  Tâche ' + task.taskId,
      content: 'Documentaion fait pour cette tâche ? '
    };
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        task.toTest = true;

      }
      this.taskService.updateTask(task, task._id).subscribe(res => {
          console.log(res);
          this.refreshTasks();
        },
        error => {
          console.log(error);
          this.snackBar.open('❌ Erreur lors de l\'affection de la tâche  !', 'Fermer', this.configSnackBar);

        }
      );
    });

  }


  goBack() {
    this.location.back();
  }
}
